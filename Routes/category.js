import express from 'express';

import multer from 'multer';
import categoryValidator from '../validations/category';
import category from '../Controllers/category';

const storage = multer.memoryStorage();
const upload = multer({
	storage,
});

const categoryRouter = express.Router();

categoryRouter.post('/add', upload.single('imageUrl'), category.addCategory, categoryValidator);
categoryRouter.get('/getAllCategory', category.getAllCategory);
categoryRouter.delete('/delete/:_id', category.deleteCategory);
categoryRouter.put('/update/:_id',upload.single('imageUrl'),category.updateCategory);
export default categoryRouter;
