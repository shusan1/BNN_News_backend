const jwt = require("jsonwebtoken");
const User = require("../model/User");

module.exports = checkAuth = async (request, response, next) => {
  try {
    const token = await request.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, "BNN_NEWS");
    const genToken = await User.findOne({
      _id: decoded.id,
      "tokens.token": token,
    });
    if (!genToken) {
      response.json({ success: false, error: "User Missing" });
    } else {
      request.token = token;
      request.genToken = genToken;
      next();
    }
  } catch (error) {
    console.log("token.js", error.message);
    response.json({ success: false, error: " Token Missing !!!" });
  }
};
