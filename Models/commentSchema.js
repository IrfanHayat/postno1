import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
	{
		resourceId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Article',
		},

		text: {
			type: String,
			required: true,
		},
		replies: [
			{
				text: {
					type: String,
					required: true,
				},
				userId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
				},
				createdAt: {
					type: Date,
					default: Date.now(),
				},
			},
		],
		userVoteStatus: {
			upvote: {
				type: Boolean,
				default: false,
			},
			downvote: {
				type: Boolean,
				default: false,
			},
		},
		upvoteCount: {
			type: Number,
			default: 0,
		},
		downvoteCount: {
			type: Number,
			default: 0,
		},
		votes: [
			{
				type: {
					type: String,
					required: true,
				},
				userId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
				},
				createdAt: {
					type: Date,
					default: Date.now(),
				},
			},
		],
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('Comment', CommentSchema);
