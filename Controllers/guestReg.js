/* eslint-disable no-underscore-dangle */
import jwt from 'jsonwebtoken';
import randomname from 'node-random-name';

import Model from '../Models/Model';

const createToken = (guest, res, next) => {
	const { id, name, userType, imageUrl } = guest;

	const payload = {
		_id: id,
		name,
		userType,
		imageUrl,
	};
	console.log(payload);
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
					name,
					userType,
					imageUrl,
				});
			}
		},
	);
};

const guestReg = async (req, res, next) => {
	const name = randomname();

	const image = 'https://postno1.s3.us-east-2.amazonaws.com/default-user.png';

	Model.UserModel.findOne({ name })
		.then(user => {
			console.log(user);
			if (user) {
				if (user.name === name) {
					res.status(200);
					next(new Error('Username Already Taken'));
				}
			} else {
				const User = new Model.UserModel({
					name,
					userType: 'guest',
					imageUrl: image,
				});
				User.save()
					.then(SavedUser => {
						console.log(SavedUser);
						const guest = {
							id: SavedUser._id,
							name: SavedUser.name,
							userType: SavedUser.userType,
							imageUrl: image,
						};
						createToken(guest, res, next);
					})
					// eslint-disable-next-line no-unused-vars
					.catch(err => {
						res.status(500);
						next(new Error('Unable to Create User. Please Try later.'));
					});
			}
		})
		.catch(err => {
			res.status(500);
			next(new Error(err));
		});
};

export default guestReg;
