import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema(
	{
		postBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		title: {
			type: String,
		},
		description: {
			type: String,
			required: true,
		},
		mediaUrl: {
			type: String,
			required: true,
		},
		mediaType: {
			type: String,
		},
		postRate: { type: Number },
		rating: [{ type: mongoose.Schema.Types.ObjectId, ref: 'rating' }],
		category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
		comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('Article', ArticleSchema);
