import Model from '../Models/Model';
import awsHandler from './aws';

const guestReg = async (req, res, next) => {
	const { name, imageUrl } = req.body;

	if (imageUrl !== '' && req.file !== undefined) {
		const image = await awsHandler.UploadToAws(req.file);
		try {
			const user = await Model.UserModel.findOne({ name: req.body.name });
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
		} catch (error) {
			res.status(500);
			next(new Error(error));
		}
	}
};

export default guestReg;
