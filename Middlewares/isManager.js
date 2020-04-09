const isManagerOwner = (req, res, next) => {
	console.log(req.user);
	if (!req.user) {
		res.status(400).send({
			Message: 'admin not logged In.',
		});
	} else if (req.user.userType == 'admin') {
		return next();
	} else {
		res.status(400).send({
			Message: 'Restricted.',
		});
	}
};

module.exports = {
	isManagerOwner,
};
