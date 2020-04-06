import express from 'express';
import multer from 'multer';
import article from '../Controllers/article';

const storage = multer.memoryStorage();
const upload = multer({
	storage,
});

const articleRouter = express.Router();

articleRouter.post('/add', upload.single('mediaUrl'), article.addArticle);

articleRouter.get('/get', article.getAllArticles);

articleRouter.get('/top', article.getTopArticle);

articleRouter.delete('/delete/:id', article.deleteArticle);

export default articleRouter;
