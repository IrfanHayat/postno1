/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
import status from 'http-status';
import Model from '../Models/Model';
import awsHandler from './aws';

// to get the highest liked post
// same logic as above..with just the increment of temporary variables  {{topPostIndex , topPostCount}} to find the highest liked post and its index

const addArticle = async (req, res, next) => {
	const { postBy, description, mediaUrl } = req.body;
	if (mediaUrl !== '' && req.file !== undefined) {
		const url = await awsHandler.UploadToAws(req.file);
		try {
			const article = new Model.ArticleModel({
				postBy,
				description,
				mediaUrl: url,
			});
			const savedArticle = await article.save();
			res.status(status.OK).send({
				savedArticle,
				Message: 'Article Created Successfully',
				type: status.Ok,
			});
		} catch (error) {
			res.status(500);
			next(new Error(error));
		}
	} else {
		res.status(500);
		next(new Error('Image is required'));
	}
};

const deleteArticle = async (req, res) => {
	const { id } = req.params;
	const result = await Model.ArticleModel.findByIdAndRemove(id);
	if (result) {
		res.status(status.OK).send({
			Message: 'Post Deleted Successfully.',
		});
	} else {
		res.status(status.INTERNAL_SERVER_ERROR).send({
			Message: 'Unable to Delete.',
		});
	}
};//

const getAllArticles = async (req, res) => {
	const article = await Model.ArticleModel.find({}).populate('category');
	if (article) {
		res.status(status.OK).send({
			article,
		});
	} else {
		res.status(status.INTERNAL_SERVER_ERROR).send({
			Message: 'Unable to find Post',
		});
	}
};




const getTopArticle = async (req, res) => {
	const topArticle = await Model.ArticleModel.findOne({})
		.populate('category')
		.sort({ _id: -1 });
	if (topArticle) {
		res.status(status.OK).send({
			topArticle,
		});
	} else {
		res.status(status.INTERNAL_SERVER_ERROR).send({
			Message: 'Unable to find Post',
		});
	}
};

export default {
	addArticle,
	getAllArticles,
	getTopArticle,
	deleteArticle,
};
