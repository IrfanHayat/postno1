import express from 'express';
import voteArticle from '../Controllers/likeArticle';
import articleValidator from '../validations/article';

const articleRouter = express.Router();

articleRouter.patch('/', articleValidator.voteArticle, voteArticle.voteArticle);

export default articleRouter;
