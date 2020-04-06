import status from 'http-status';
import Model from '../Models/Model';

const addCategory = async (req, res, next) => {
	const { category } = req.body;
	const count = await Model.CategoryModel.find({ category }).count();
	if (count.length > 0) {
		res.status(status.INTERNAL_SERVER_ERROR).send({
			Message: 'Category already Exist',
		});
	} else {
		try {
			const categoryAdd = new Model.CategoryModel({
				category,
				slug: category.toLowerCase(),
			});
			const savedCategory = await categoryAdd.save();
			if (savedCategory) {
				res.status(200).json({
					savedCategory,
					Message: 'Saved Category Successfully',
				});
			}
		} catch (error) {
			res.status(500);
			next(new Error(error));
		}
	}
};

const getAllCategory = async (req, res, next) => {
	try {
		const getCategory = await Model.CategoryModel.find({});
		if (getCategory) {
			res.status(200).json(getCategory);
		} else {
			res.status(status.INTERNAL_SERVER_ERROR).json({ message: 'No category found' });
		}
	} catch (error) {
		res.status(500);
		next(new Error(error));
	}
};

const deleteCategory = async (req, res, next) => {
	const { _id } = req.body;
	try {
		const deletecategory = await Model.CategoryModel.deleteOne({ _id });
		if (deletecategory) {
			res.status(200).json(deletecategory);
		} else {
			res.status(status.INTERNAL_SERVER_ERROR).json('Data not delete successfully');
		}
	} catch (error) {
		res.status(500);
		next(new Error(error));
	}
};

export default { addCategory, deleteCategory, getAllCategory };
