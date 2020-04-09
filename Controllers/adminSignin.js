import jwt from 'jsonwebtoken';

const createToken = (user, res, next) => {
	const { id, email, name, userType } = user;
	const payload = {
		_id: id,
		email,
		name,
		userType,
	};

	jwt.sign(
		payload,
		process.env.JwtSecret,
		{
			expiresIn: '1d',
		},
		(err, token) => {
			if (err) {
				res.status(500);
				next(new Error('Unable to generate Token.'));
			} else {
				res.json({
					token,
					email,
					name,
					userType,
				});
			}
		},
	);
};
const adminSignin = (req, res, next) => {
	const { email, password } = req.body;
	if (email == 'admin@gmail.com' && password == 'qwerty') {
		const user = {
			id: '007',
			email: 'admin@gmail.com',
			name: 'admin',
			userType: 'admin',
		};
		createToken(user, res, next);
	} else {
		res.status(400);
		next(new Error('Invalid email or Password'));
	}
};

export default adminSignin;
