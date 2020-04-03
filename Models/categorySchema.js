import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
	{
		category: String,
		slug: String,
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('category', CategorySchema);
