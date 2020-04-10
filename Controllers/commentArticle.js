/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
import status from 'http-status';
import Model from '../Models/Model';

const addCommentReply = async (req, res) => {
	const { commentId, text } = req.body;

	try {
		const comment = await Model.CommentModel.findByIdAndUpdate(
			commentId,
			{
				$push: {
					replies: {
						text,
						userId: req.user._id,
					},
				},
			},
			{
				new: true,
				upsert: true,
			},
		);

		const user = await Model.UserModel.findById(req.user._id, {
			name: 1,
			imageUrl: 1,
		});

		res.status(200).json({
			text,
			userId: user,
			_id: comment.replies[comment.replies.length - 1],
		});
	} catch (error) {
		res.status(500).send('internal server error');
	}
};

const deleteCommentReply = (req, res) => {
	const { commentId, replyId } = req.body;
	Model.CommentModel.updateOne({ _id: commentId }, { $pull: { replies: { _id: replyId } } }, { multi: true }, err => {
		if (err) {
			res.status(500).send({ Message: 'Internal Server error. Cannot add reply' });
		} else {
			res.status(200).send({
				Message: 'Reply deleted Successfully',
			});
		}
	});
};

const addCommentRefToArticle = (articleId, commentId) => {
	return new Promise((resolve, reject) => {
		// pushing id of comment to Article Model to get the comment by referemnce is articles
		Model.ArticleModel.findOneAndUpdate(
			{ _id: articleId },
			{ $push: { comments: commentId } },
			{ upsert: true, new: true },
			(err, doc) => {
				if (err) {
					reject(`Internal Server error. Cannot add comments reference in article ${err}`);
				} else {
					resolve(doc);
				}
			},
		);
	});
};

// add Comment
const addComment = async (req, res) => {
	const { _id } = req.user;
	const { resourceId, text } = req.body;

	try {
		const comment = await Model.CommentModel.create({
			text,
			resourceId,
			userId: _id,
		});

		await addCommentRefToArticle(resourceId, comment._id);

		const populatedComment = await Model.CommentModel.populate(comment, {
			path: 'userId',
			select: { name: 1, path: 1 },
		});

		res.status(status.OK).send({
			savedComment: {
				replies: [],
				text: populatedComment.text,
				userId: populatedComment.userId,
			},
			Message: 'Comment Created Successfully',
			type: status.Ok,
		});
	} catch (err) {
		res.status(status.INTERNAL_SERVER_ERROR).send({
			err,
			Message: 'Can not create Comment ',
		});
	}
};

// deleting Comment
const deleteComment = (req, res) => {
	const { id } = req.params;
	Model.CommentModel.findByIdAndRemove(id, (err, result) => {
		if (result) {
			res.status(status.OK).send({
				Message: 'Comment Deleted Successfully.',
			});
		} else {
			res.status(status.INTERNAL_SERVER_ERROR).send({
				Message: 'Unable to Delete.',
				err,
			});
		}
	});
};

export default {
	addCommentReply,
	deleteCommentReply,
	addComment,
	deleteComment,
	addCommentRefToArticle,
};
