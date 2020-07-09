var User = require("../model/User");
class LoginController {
    //sign the user in to the application
    async signIn(request, response) {
        const result = request.body;

        try {
            let user = await User.findOne({ email: result.email });
            if (!user) {
                response
                    .status(404)
                    .json({
                        success: false,
                        error: { field: "email", message: "User does not exist!" },
                    });
            } else {
                if (await user.comparePassword(result.password)) {
                    const token = await user.generateAuthToken();
                    response
                        .status(200)
                        .json({ success: true, user: user, token: token });
                } else {
                    response
                        .status(401)
                        .json({
                            success: false,
                            error: { field: "email", message: "Invalid login. Try again!" },
                        });
                }
            }
        } catch (error) {
            response.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = new LoginController();
