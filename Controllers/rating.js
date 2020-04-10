import Model from '../Models/Model';

const addRating = async (req, res) => {
	const { resourceId, rating: postRating } = req.body;

	try {
		const rating = await Model.RatingModel.create({
			resourceId,
			rating: postRating,
			ratingBy: req.user._id,
		});

		await Model.ArticleModel.findByIdAndUpdate(
			resourceId,
			{
				$push: {
					ratings: rating,
				},
			},
			{ upsert: true },
		);

		res.status(200).json(rating);
	} catch (error) {
		console.log(error);
		res.status(500).send('internal server error');
	}
};

const deleteRating = async (req, res) => {
	const { _id } = req.params;
	const deleterating = await Model.RatingModel.deleteOne({ _id });
	res.status(200).json({ deleterating });
};

export default { addRating, deleteRating };
