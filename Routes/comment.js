import express from 'express';
import commentValidator from '../validations/comment';
import commentArticle from '../Controllers/commentArticle';

const commentRouter = express.Router();

commentRouter.post(
	'/add',
	commentValidator.addComment,
	commentArticle.addComment,
);

commentRouter.delete('/delete/:id', commentArticle.deleteComment);

commentRouter.patch(
	'/reply/add',
	commentValidator.addCommentReply,
	commentArticle.addCommentReply,
);

commentRouter.patch(
	'/reply/delete',
	commentValidator.deleteCommentReply,
	commentArticle.deleteCommentReply,
);

export default commentRouter;
