var User = require("../model/User");

class RegisterController {
  // create a new user and persist in database
  async registerUser(request, response) {
    var userdetail = request.body;
    if (await User.emailExists(userdetail.email)) {
      response.json({
        success: false,
        error: { field: "email", message: "Email already registered!" },
      });
    } else {
      try {
        let newUser = new User({
          firstname: userdetail.firstname,
          lastname: userdetail.lastname,
          phonenumber: userdetail.phonenumber,
          email: userdetail.email,
          password: userdetail.password
        });
        let user = await newUser.save();
        response
          .json({ success: true, message: "Register successful!", user: user });
      } catch (error) {
        response.json({ success: false, error: error.message });
      }
    }
  }
}

module.exports = new RegisterController();
