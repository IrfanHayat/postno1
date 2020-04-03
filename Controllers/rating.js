import Model from '../Models/Model';

const addRating = async (req, res, next) => {
	const { resourceId, rating, userId } = req.body;
	const ratingAdd = new Model.CategoryModel({
		resourceId,
		rating,
		userId,
	});
	const savedRating = await ratingAdd.save();
	if (savedRating) {
		res.status(200).json({
			savedRating,
			Message: 'Saved Rating Successfully',
		});
	}
};

export default addRating;
