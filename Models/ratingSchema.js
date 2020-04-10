import mongoose from 'mongoose';

const RatingSchema = new mongoose.Schema(
	{
		resourceId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Article',
		},
		rating: {
			type: String,
			required: true,
			min: 0,
			max: 5,
		},

		ratigBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('rating', RatingSchema);
