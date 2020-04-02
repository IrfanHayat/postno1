import express from 'express';
import article from '../Controllers/article';
import admin from '../Controllers/admin';

const adminRouter = express.Router();

adminRouter.get('/users', admin.getUsers);

adminRouter.get('/articles', admin.getArticles);

adminRouter.delete('/users/delete/:id', admin.deleteUser);

adminRouter.get('/donations', admin.getDonationsInfo);

adminRouter.delete('/article/delete/:id', article.deleteArticle);

export default adminRouter;
