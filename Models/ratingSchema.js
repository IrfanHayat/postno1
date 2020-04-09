import mongoose from 'mongoose';

const RatingSchema = new mongoose.Schema(
	{
		resourceId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Article',
		},
		rating: [
			{
				type: String,
				required: true,
			},
		],
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('rating', RatingSchema);
