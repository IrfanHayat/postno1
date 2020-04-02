import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
	{
		resourceId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Article',
		},
		category: String,
		slug: String,
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('category', CategorySchema);
