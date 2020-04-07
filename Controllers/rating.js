import Model from '../Models/Model';

const addRating = async (req, res, next) => {
	const { resourceId, rating, userId } = req.body;
	const ratingAdd = new Model.RatingModel({
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

const deleteRating = async (req, res, next) => {
	const { resourceId, userId } = req.body;
	const { _id } = req.params;
	const deleterating = await Model.RatingModel.deleteOne({ _id, resourceId, userId });
	res.status(200).json({ deleterating });
};

export default { addRating, deleteRating };
