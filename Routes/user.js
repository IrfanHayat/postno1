import express from 'express';
import getUserProfile from '../Controllers/user';

const userRouter = express.Router();

userRouter.get('/getProfileByToken', getUserProfile);

export default userRouter;
