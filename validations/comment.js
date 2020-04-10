import status from 'http-status';

const addComment = (req, res, next) => {
	const { resourceId, text } = req.body;

	if (!resourceId || !text) {
		res.status(status.BAD_REQUEST);
		next(new Error('ResourceID, text and userId Must be Defined in request body'));
	} else {
		next();
	}
};

const deleteCommentReply = (req, res, next) => {
	const { commentId, replyId } = req.body;

	if (!commentId || !replyId) {
		res.status(status.BAD_REQUEST);
		next(new Error('replyID and commentID Must be Defined in request body'));
	} else {
		next();
	}
};

const addCommentReply = (req, res, next) => {
	const { commentId, text } = req.body;

	if (!commentId || !text) {
		res.status(status.BAD_REQUEST);
		next(new Error('commentID, text and userId Must be Defined in request body'));
	} else {
		next();
	}
};

export default {
	addComment,
	deleteCommentReply,
	addCommentReply,
};
