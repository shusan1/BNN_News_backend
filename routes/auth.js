const express = require("express");
const RegisterController = require("../controller/registercontroller");
const LoginController = require("../controller/logincontroller");


const router = express.Router();

router.post("/sign-up", RegisterController.registerUser);
router.post("/sign-in", LoginController.signIn);




module.exports = router;