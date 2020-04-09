import express from 'express';
import passport from 'passport';

import userSignIn from '../Controllers/userSignin';
import adminSignIn from '../Controllers/adminSignin';
import userValidator from '../validations/user';

const signInRouter = express.Router();

signInRouter.post('/', userValidator.userSignin, userSignIn);
signInRouter.get('/google', passport.authenticate('google', { scope: ['profile'] }));

signInRouter.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {});

signInRouter.post('/admin', adminSignIn);

export default signInRouter;
