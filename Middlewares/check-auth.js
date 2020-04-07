import jwt from 'jsonwebtoken';
import status from 'http-status';

const checkAuth = (req, res, next) => {
	const token = req.headers.authorization.split(' ')[1];
	console.log(token);
	try {
		const decoded = jwt.verify(token, process.env.JwtSecret);
		req.userData = decoded;
		next(); // if we successfully authenticate
	} catch (error) {
		res.status(status.UNAUTHORIZED).json({ error });
	}
};

export default checkAuth;
