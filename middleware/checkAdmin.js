module.exports = checkAdmin = async (request, response, next) => {
	try {
		if (request.genToken.usertype === 'Admin') {
			next()
		} else {
			response.json({ success: false, error: 'You are not permitted to execute!' })
		}
	} catch (error) {
		response.json({ success: false, error: error.message })
	}
};
