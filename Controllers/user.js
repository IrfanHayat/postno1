import status from 'http-status';
import Model from '../Models/Model';

const getUserProfile = async (req, res, next) => {
	try {
		const user = await Model.UserModel.findOne({});
		if (user) {
			res.status(200).json({ user });
		} else {
			res.status(status.INTERNAL_SERVER_ERROR).json({ message: 'There is no user' });
		}
	} catch (error) {
		res.status(500);
		next(new Error('Error occured'));
	}
};

export default getUserProfile;
