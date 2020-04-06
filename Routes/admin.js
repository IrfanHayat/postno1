import express from 'express';

import admin from '../Controllers/admin';

const adminRouter = express.Router();

adminRouter.get('/users', admin.getUsers);
adminRouter.delete('/users/delete/:id', admin.deleteUser);

export default adminRouter;
