import Model from '../Models/Model';

const guestReg = (req, res, next) => {
	const { name } = req.body;

	Model.UserModel.findOne({ name: req.body.name })
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
				});
				User.save()
					.then(SavedUser => {
						console.log(SavedUser);
						return res.status(200).send({
							Message: 'Account Created Successfully.',
						});
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
