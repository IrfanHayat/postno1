import status from 'http-status';

const addArticle = (req, res, next) => {
	const { postBy, description } = req.body;

	if (!postBy || !description) {
		res.status(status.BAD_REQUEST);
		next(new Error('authorId and description  Must be Defined in request body'));
	} else {
		next();
	}
};

const voteArticle = (req, res, next) => {
	const { resourceId, vote } = req.body;

	if (!resourceId || !vote || !vote.type || !vote.userId) {
		res.status(status.BAD_REQUEST);
		next(new Error('ResourceID, type of vote and userId Must be Defined in request body'));
	} else {
		next();
	}
};

export default { addArticle, voteArticle };
