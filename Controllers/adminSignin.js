import jwt from 'jsonwebtoken';
import Model from '../Models/Model';

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
const adminSignin = async (req, res, next) => {
	const { email, password } = req.body;
	const image = 'https://postno1.s3.us-east-2.amazonaws.com/default-user.png';
	if (email == 'admin@gmail.com' && password == 'qwerty') {
		Model.UserModel.findOne({ email })
			.then(async user => {
				console.log(user);

				const count = await Model.UserModel.find({ userType: 'admin' }).count();
				if (count === 0) {
					const User = new Model.UserModel({
						email,
						password,
						name: 'Admin',
						userType: 'admin',
						imageUrl: image,
					});
					console.log(User);
					User.save()
						.then(SavedUser => {
							console.log(SavedUser);
							createToken(SavedUser, res, next);
						})
						.catch(err => {
							res.status(500);
							next(new Error('Unable to Create Admin User. Please Try later.'));
						});
				} else {
					const User = await Model.UserModel.findOne({ userType: 'admin' });

					createToken(User, res, next);
				}
			})
			.catch(err => {
				res.status(500);
				next(new Error(err));
			});
	}
};

export default adminSignin;
