import express from 'express';
import loggedInMiddleware from '../Middlewares/loggedIn';
import rating from '../Controllers/rating';

const ratingRouter = express.Router();

ratingRouter.post('/add', loggedInMiddleware.isLoggedIn, rating.addRating);

ratingRouter.delete('/delete/:_id', loggedInMiddleware.isLoggedIn, rating.deleteRating);

export default ratingRouter;
