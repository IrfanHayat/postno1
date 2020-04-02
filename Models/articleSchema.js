import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema(
	{
		postBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		description: {
			type: String,
			required: true,
		},
		mediaUrl: {
			type: String,
			required: true,
		},
		category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'category' }],
		comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('Article', ArticleSchema);
