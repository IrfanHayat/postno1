/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-underscore-dangle */
/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import status from 'http-status';
import Model from '../Models/Model';
import awsHandler from './aws';

const getUsers = (req, res, next) => {
	// eslint-disable-next-line object-shorthand
	Model.UserModel.find()
		.then(users => {
			const userAccounts = [];
			const guestAccounts = [];
			if (users.length > 0) {
				// map on articles

				users.map(user => {
					if (user.userType === 'user') {
						userAccounts.push(user);
					}
					if (user.userType === 'guest') {
						guestAccounts.push(user);
					}
				});
			}
			res.status(status.OK).send({ userAccounts, guestAccounts });
		})
		// eslint-disable-next-line no-unused-vars
		.catch(err => {
			res.status(500);
			next(new Error('Unable to get Users. Please Try later.'));
		});
};

const deletedUserPostsDeletion = id => {
	return new Promise((resolve, reject) => {
		Model.ArticleModel.deleteMany({ postBy: id })
			.then(articles => {
				Model.CommentModel.deleteMany({ userId: id })
					.then(cmnts => {
						resolve('done');
					})
					.catch(err => {
						reject('unable to delete');
					});
			})
			.catch(err => {
				reject('cannot delete');
			});
	});
};

// deleting Users
const deleteUser = (req, res) => {
	const { id } = req.params;
	deletedUserPostsDeletion(id)
		.then(msg => {
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
		})
		.catch(err => {
			res.status(500).send({
				Message: 'Unable to Delete.',
				err,
			});
		});
};

const getArticles = (req, res) => {
	Model.ArticleModel.find()
		.sort({ createdAt: -1 })
		.populate('postBy', 'name imageUrl userType')
		.then(articles => {
			const userArticles = [];
			const guestArticles = [];
			const adminArticles = [];
			if (articles.length > 0) {
				// map on articles
				articles.map(article => {
					if (article.postBy.userType === 'user') {
						userArticles.push(article);
					}
					if (article.postBy.userType === 'guest') {
						guestArticles.push(article);
					}
					if (article.postBy.userType === 'admin') {
						adminArticles.push(article);
					}
				});
			}
			res.status(status.OK).send({ userArticles, adminArticles, guestArticles });
		})
		.catch(err => {
			res.status(status.INTERNAL_SERVER_ERROR).send({
				Message: 'No Articles!',
				err,
			});
		});
};

const addArticle = post => {
	return new Promise((resolve, reject) => {
		const { postBy, description, title, file } = post;
		// comma separating tag values
		if (file !== '' && file !== undefined) {
			awsHandler
				.UploadToAws(file)
				.then(url => {
					const article = new Model.ArticleModel({
						postBy,
						description,
						title,
						mediaUrl: url,
					});
					article
						.save()
						.then(savedArticle => {
							resolve(savedArticle);
						})
						.catch(err => {
							reject(err);
						});
				})
				.catch(err => {
					reject(err);
				});
		} else {
			// eslint-disable-next-line prefer-promise-reject-errors
			reject('Image is required');
		}
	});
};

const addArticlesByAdmin = (req, res) => {
	const { title, description } = req.body;

	if (req.files.length > 0 && title.length > 0 && description.length > 0) {
		let success = true;
		req.files.map((file, index) => {
			const post = {
				postBy: req.user._id,
				mediaUrl: file,
				title: title[index],
				description: description[index],
			};
			addArticle(post)
				.then(savedDoc => {
					if (req.files.length - 1 === index) {
						if (success === true) {
							res.status(200).send({
								Message: 'Your posts are successfully uploaded',
							});
						} else {
							res.status(500).send({
								Message: 'Unable to upload some of your posts due to some network problem',
							});
						}
					}
				})
				.catch(err => {
					if (req.files.length - 1 === index) {
						res.status(500).send({
							Message: 'Unable to upload some of your posts due to some network problem',
						});
					} else {
						success = false;
					}
				});
		});
	} else {
		res.status(500).send({
			Message: 'Must fill all the required fields of the form',
		});
	}
};

export default { getUsers, deleteUser, getArticles, addArticlesByAdmin };
