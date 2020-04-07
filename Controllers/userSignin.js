import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Model from '../Models/Model';

const createToken = (user, res, next) => {
	const { id, email, name, imageUrl } = user;
	const payload = { _id: id, email, imageUrl };
	// create a token
	jwt.sign(
		payload,
		process.env.JwtSecret,
		{
			expiresIn: '1d',
		},
		(err, token) => {
			// Error Create the Token
			if (err) {
				res.status(500);
				next(new Error('Unable to generate Token.'));
			} else {
				// Token Created
				res.json({
					token,
					email,
					name,
					imageUrl,
				});
			}
		},
	);
};

const userSignIn = async (req, res, next) => {
	const { email, password } = req.body;
	// Find user with the passed email
	const user = await Model.UserModel.findOne({ email });
	if (user) {
		const result = await bcryptjs.compare(password, user.password);
		if (result) {
			createToken(user, res, next);
		} else {
			res.status(400);
			next(new Error('Invalid Password'));
		}
	} else {
		// Wrong Password.
		res.status(400);
		next(new Error('No User Exist With This Email'));
	}
};

export default userSignIn;
