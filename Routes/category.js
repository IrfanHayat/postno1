import express from 'express';

import categoryValidator from '../validations/category';
import category from '../Controllers/category';

const categoryRouter = express.Router();

categoryRouter.post('/add', category.addCategory, categoryValidator);
categoryRouter.get('/getAllCategory', category.getAllCategory);
categoryRouter.delete('/delete/:_id', category.deleteCategory);
export default categoryRouter;
