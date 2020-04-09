import status from 'http-status';
import jwt from 'jsonwebtoken';
import User from '../Models/userSchema';

const getUserProfile = async (req, res) => {
	const token = req.headers.authorization.split(' ')[1];
	console.log(token);
	try {
		const decoded = jwt.verify(token, process.env.JwtSecret);
		req.userData = decoded;
		const user = await User.findOne({ _id: req.userData._id }, { name: 1, email: 1, imageUrl: 1 });

		res.status(200).json(user);
	} catch (error) {
		res.status(status.UNAUTHORIZED).json({ error });
	}
};

export default getUserProfile;
