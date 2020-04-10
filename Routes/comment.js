import express from 'express';
import commentValidator from '../validations/comment';
import commentArticle from '../Controllers/commentArticle';

import loggedInMiddleware from '../Middlewares/loggedIn';

const commentRouter = express.Router();

commentRouter.post('/add', loggedInMiddleware.isLoggedIn, commentValidator.addComment, commentArticle.addComment);

commentRouter.delete('/delete/:id', loggedInMiddleware.isLoggedIn, commentArticle.deleteComment);

commentRouter.patch('/reply/add', loggedInMiddleware.isLoggedIn, commentArticle.addCommentReply);

commentRouter.patch(
	'/reply/delete',
	loggedInMiddleware.isLoggedIn,
	commentValidator.deleteCommentReply,
	commentArticle.deleteCommentReply,
);

export default commentRouter;
