import express from 'express';

import rating from '../Controllers/rating';

const ratingRouter = express.Router();

ratingRouter.post('/add', rating.addRating);

ratingRouter.delete('/delete/:_id', rating.deleteRating);
export default ratingRouter;
