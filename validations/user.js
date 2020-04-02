import status from 'http-status';

const userSignup = (req, res, next) => {
	const { password, email } = req.body;

	if (!email || !password) {
		res.status(status.BAD_REQUEST);
		next(new Error('name, email, password, gender, contactNo and username Must be Defined in request body'));
	} else {
		next();
	}
};

const userSignin = (req, res, next) => {
	const { password, email } = req.body;
	if (!email || !password) {
		res.status(status.BAD_REQUEST);
		next(new Error('email, password Must be Defined in request body'));
	} else {
		next();
	}
};

const guestSignup = (req, res, next) => {
	const { name } = req.body;

	if (!name) {
		res.status(status.BAD_REQUEST);
		next(new Error('name Must be Defined in request body'));
	} else {
		next();
	}
};

export default { userSignup, guestSignup, userSignin };
