import bcryptjs from 'bcryptjs';
import Model from '../Models/Model';
import awsHandler from './aws';

const userSignUp = async (req, res, next) => {
	const { name, email, password, imageUrl } = req.body;
	const query = { email };

	if (imageUrl !== '' && req.file !== undefined) {
		const image = await awsHandler.UploadToAws(req.file);

		const user = await Model.UserModel.findOne(query);
		console.log(user, email);
		if (user) {
			if (user.email == email) {
				res.status(400);
				next(new Error('Email Already Taken.'));
			}
		} else {
			try {
				const hashedPassword = await bcryptjs.hash(password, 12);
				const User = new Model.UserModel({
					email,
					name,
					password: hashedPassword,
					imageUrl: image,
					userType: 'user',
				});
				try {
					const saveUser = await User.save();
					return res.status(200).send({
						Message: 'Account Created Successfully.',
						saveUser,
					});
				} catch (error) {
					res.status(500);
					next(new Error(error));
				}
			} catch (error) {
				res.status(500);
				next(new Error(error));
			}
		}
	}
};

export default userSignUp;
