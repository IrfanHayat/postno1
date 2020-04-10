import express from 'express';
import voteArticle from '../Controllers/commentLikes';
//import loggedInMiddleware from '../Middlewares/loggedIn';

const commentLikeRouter = express.Router();

commentLikeRouter.patch('/', voteArticle);

export default commentLikeRouter;
