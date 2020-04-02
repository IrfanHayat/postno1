/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
import status from 'http-status';
import Model from '../Models/Model';

const addCommentReply = (req, res) => {
	const { commentId, reply } = req.body;
	Model.CommentModel.findOneAndUpdate(
		{ _id: commentId },
		{ $push: { replies: reply } },
		{ upsert: true, new: true },

		(err, doc) => {
			if (err) {
				res
					.status(500)
					.send({ Message: 'Internal Server error. Cannot add reply' });
			} else {
				res.status(200).send(doc.replies[doc.replies.length - 1]);
			}
		},
	);
};

const deleteCommentReply = (req, res) => {
	const { commentId, replyId } = req.body;
	Model.CommentModel.updateOne(
		{ _id: commentId },
		{ $pull: { replies: { _id: replyId } } },
		{ multi: true },
		err => {
			if (err) {
				res
					.status(500)
					.send({ Message: 'Internal Server error. Cannot add reply' });
			} else {
				res.status(200).send({
					Message: 'Reply deleted Successfully',
				});
			}
		},
	);
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
					reject(
						`Internal Server error. Cannot add comments reference in article ${err}`,
					);
				} else {
					resolve(doc);
				}
			},
		);
	});
};

// add Comment
const addComment = (req, res) => {
	const { resourceId, text, userId } = req.body;
	const comment = new Model.CommentModel({
		resourceId,
		text,
		userId,
	});
	comment
		.save()
		.then(savedComment => {
			addCommentRefToArticle(resourceId, savedComment._id);
			res.status(status.OK).send({
				savedComment,
				Message: 'Comment Created Successfully',
				type: status.Ok,
			});
		})
		.catch(err => {
			res.status(status.INTERNAL_SERVER_ERROR).send({
				Message: 'Can not create Comment ',
				err,
			});
		});
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
