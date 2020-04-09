import Model from '../Models/Model';

const addRating = async (req, res) => {
	const { resourceId, rating } = req.body;
	const ratingAdd = new Model.RatingModel({
		resourceId,
		rating,
	});
	const savedRating = await ratingAdd.save();
	if (savedRating) {
		res.status(200).json({
			savedRating,
			Message: 'Saved Rating Successfully',
		});
	}
};

const deleteRating = async (req, res) => {
	const { _id } = req.params;
	const deleterating = await Model.RatingModel.deleteOne({ _id });
	res.status(200).json({ deleterating });
};

export default { addRating, deleteRating };
