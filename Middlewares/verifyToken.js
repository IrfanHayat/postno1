const jwt = require('jsonwebtoken');

const verifyTokenSetUser = (req, res, next) => {
	const authHeader = req.get('authorization');
	if (authHeader) {
		const token = authHeader.split(' ')[1];
		console.log(token);
		if (token) {
			jwt.verify(token, process.env.JwtSecret, (err, user) => {
				if (err) {
					res.status(500).send({
						Message: 'Token Expired!',
					});
				}
				req.user = user;
				next();
			});
		} else {
			next();
		}
	} else {
		next();
	}
};

module.exports = {
	verifyTokenSetUser,
};
