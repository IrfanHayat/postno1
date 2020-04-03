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

export default addCategory;
