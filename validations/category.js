import status from 'http-status';

const addCategory = (req, res, next) => {
	const { category } = req.body;

	if (!category) {
		res.status(status.BAD_REQUEST);
		next(new Error('ResourceID, category and userId Must be Defined in request body'));
	} else {
		next();
	}
};

export default addCategory;
