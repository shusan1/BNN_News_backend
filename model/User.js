const mongoose = require('mongoose');
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    firstname: {
        type: String,
        required: [true, "Name field is required"]
    },
    lastname: {
        type: String,
        required: [true, "Name field is required"]
    },
    phonenumber: {
        type: String,
        required: [true, "Name field is required"]
    },
    email: {
        type: String,
        required: [true, "Name field is required"]
    },

    password: {
        type: String,
        required: [true, "Name field is required"]
    },
    usertype: {
        type: String,
        default: 'User',
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});
UserSchema.pre("save", async function (next) {
    if (!this.isNew || !this.isModified) {
        next();
    } else {
        try {
            // hash the plain text password
            let hashedPassword = await bcrypt.hash(this.password, 10); // 10 is the salt rounds
            // set the hashed password to be the password of the new user
            this.password = hashedPassword;
            // execute next code
            next();
        } catch (error) {
            next(error);
            console.log(error.message);
        }
    }
});
UserSchema.statics.emailExists = async function (email) {
    let emailExists = await User.findOne({ email: email });
    return emailExists;
};

UserSchema.methods.comparePassword = async function (plainPassword) {
    let matched = await bcrypt.compare(plainPassword, this.password);
    return matched;
};

UserSchema.methods.generateAuthToken = async function () {
    const token = await jwt.sign({ id: this._id }, "BNN_NEWS");
    this.tokens = await this.tokens.concat({ token });
    await this.save();
    return token;
};
UserSchema.methods.toJSON = function () {
    let user = this.toObject();
    delete user.password;
    delete user.createdAt;
    delete user.__v;
    return user;
};
const User = mongoose.model('user', UserSchema);

module.exports = User;
