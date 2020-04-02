/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import status from 'http-status';
import Model from '../Models/Model';

const getUsers = (req, res, next) => {
	// eslint-disable-next-line object-shorthand
	Model.UserModel.find()
		.then(users => {
			res.status(200).send({ users });
		})
		// eslint-disable-next-line no-unused-vars
		.catch(err => {
			res.status(500);
			next(new Error('Unable to get Users. Please Try later.'));
		});
};

// deleting Users
const deleteUser = (req, res) => {
	const { id } = req.params;
	Model.UserModel.findByIdAndRemove(id, (err, result) => {
		if (result) {
			res.status(200).send({
				Message: 'User Deleted Successfully.',
			});
		} else {
			res.status(500).send({
				Message: 'Unable to Delete.',
				err,
			});
		}
	});
};

const getDonationsInfo = (req, res, next) => {
	// eslint-disable-next-line object-shorthand
	Model.InvestModel.find()
		.then(donationsInfo => {
			res.status(200).send({ donationsInfo });
		})
		// eslint-disable-next-line no-unused-vars
		.catch(err => {
			res.status(500);
			next(new Error('Unable to get donatioin info. Please Try later.'));
		});
};

const getArticles = (req, res) => {
	Model.ArticleModel.find()
		.sort({ createdAt: -1 })
		.then(articles => {
			if (articles.length > 0) {
				// map on articles
				articles.map(article => {
					// temporary variables for counting upvotes and downvotes of each article
					let upvoteCount = 0;
					let downvoteCount = 0;
					if (article.votes.length > 0) {
						// here we are getting upvotes and downvotes count
						article.votes.map(el => {
							if (el.type === 'upvote') {
								upvoteCount += 1;
							}
							if (el.type === 'downvote') {
								downvoteCount += 1;
							}
						});
					}
					// finally assigning votecounts to every article
					article.upvoteCount = upvoteCount;
					article.downvoteCount = downvoteCount;
				});
			}
			res.status(status.OK).send(articles);
		})
		.catch(err => {
			res.status(status.INTERNAL_SERVER_ERROR).send({
				Message: 'No Articles!',
				err,
			});
		});
};

export default { getUsers, deleteUser, getDonationsInfo, getArticles };
