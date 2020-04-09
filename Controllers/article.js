import status from 'http-status';
import Model from '../Models/Model';
import awsHandler from './aws';

const articleCommentPopulationOptions = {
	path: 'comments',
	select: {
		text: 1,
		userId: 1,
		replies: 1,
	},
	populate: [
		{
			path: 'userId',
			select: {
				name: 1,
				imageUrl: 1,
			},
		},
		{
			path: 'replies',
			select: {
				text: 1,
				userId: 1,
				replies: 1,
			},
			populate: 'userId',
			select: {
				name: 1,
				imageUrl: 1,
			},
		},
	],
};

const addArticle = async (req, res, next) => {
	console.log(req.user);
	const { description, mediaUrl, mediaType, category, rating } = req.body;
	let { postRate } = req.body;
	if (mediaUrl !== '' && req.file !== undefined) {
		const url = await awsHandler.UploadToAws(req.file);

		const count = await Model.ArticleModel.find().count();
		console.log(count);
		console.log(postRate);
		if (count == 0) {
			postRate = 1;
		} else if (count > 0) {
			const articleRate = await Model.ArticleModel.findOne({}, { postRate: 1 }).sort({ _id: -1 });
			postRate = articleRate.postRate + articleRate.postRate;
		} else {
			res.status(500).json({ message: 'Post Rate must be 1$' });
		}
		try {
			const article = new Model.ArticleModel({
				postBy: req.user._id,
				description,
				mediaUrl: url,
				mediaType,
				category,
				rating,
				postRate,
			});

			const savedArticle = await article.save();
			if (savedArticle) {
				const postData = await Model.UserModel.findOne({ _id: savedArticle.postBy });
				const Category = await Model.CategoryModel.findOne({ _id: savedArticle.category });
				const Rating = await Model.RatingModel.findOne({ _id: savedArticle.rating });

				savedArticle.postBy = postData;
				savedArticle.rating = Rating;
				savedArticle.category = Category;
				res.status(status.OK).send({
					savedArticle,
					Message: 'Article Created Successfully',
					type: status.Ok,
				});
			}
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
	const { _id } = req.params;
	const result = await Model.ArticleModel.findByIdAndRemove(_id);
	if (result) {
		res.status(status.OK).send({
			Message: 'Post Deleted Successfully.',
		});
	} else {
		res.status(status.INTERNAL_SERVER_ERROR).send({
			Message: 'Unable to Delete.',
		});
	}
}; //

const getAllArticles = async (req, res) => {
	const article = await Model.ArticleModel.find({})
		.populate(articleCommentPopulationOptions)
		.populate('postBy')
		.populate('category')
		.populate('rating');
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
		.populate(articleCommentPopulationOptions)
		.populate('category')
		.populate('postBy')
		.populate('rating')
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
