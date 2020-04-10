import express from 'express';
import multer from 'multer';

import article from '../Controllers/article';

import loggedInMiddleware from '../Middlewares/loggedIn';

const storage = multer.memoryStorage();
const upload = multer({
	storage,
});

const articleRouter = express.Router();

articleRouter.post('/add', loggedInMiddleware.isLoggedIn, upload.single('mediaUrl'), article.addArticle);
articleRouter.get('/get', loggedInMiddleware.isLoggedIn, article.getAllArticles);
articleRouter.get('/top', loggedInMiddleware.isLoggedIn, article.getTopArticle);
articleRouter.delete('/delete/:id', loggedInMiddleware.isLoggedIn, article.deleteArticle);
articleRouter.get('/getPostRate', loggedInMiddleware.isLoggedIn, article.getCurrentPostRate);

export default articleRouter;
