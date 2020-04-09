import express from 'express';
import multer from 'multer';
import article from '../Controllers/article';

import admin from '../Controllers/admin';
import { verifyTokenSetUser } from '../Middlewares/verifyToken';
import authMiddleware from '../Middlewares/isManager';

const storage = multer.memoryStorage();
const upload = multer({
	storage,
});

const adminRouter = express.Router();

adminRouter.post(
	'/post/add',
	authMiddleware.isManagerOwner,
	upload.single('mediaUrl'),

	article.addArticle,
);

adminRouter.get('/users', verifyTokenSetUser, authMiddleware.isManagerOwner, admin.getUsers);

adminRouter.get('/posts', authMiddleware.isManagerOwner, admin.getArticles);

adminRouter.delete('/user/delete/:id', authMiddleware.isManagerOwner, admin.deleteUser);

adminRouter.delete('/post/delete/:id', authMiddleware.isManagerOwner, article.deleteArticle);

export default adminRouter;
