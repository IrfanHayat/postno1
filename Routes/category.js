import express from 'express';
import categoryValidator from '../validations/category';
import addCategory from '../Controllers/category';

const categoryRouter = express.Router();

categoryRouter.post('/add', addCategory, categoryValidator);

export default categoryRouter;
