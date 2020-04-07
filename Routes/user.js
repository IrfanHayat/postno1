import express from 'express';
import getUserProfile from '../Controllers/user';
import checkAuth from '../Middlewares/check-auth';

const userRouter = express.Router();

userRouter.get('/getProfileByToken', checkAuth, getUserProfile);

export default userRouter;
