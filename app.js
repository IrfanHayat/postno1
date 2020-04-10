/* eslint-disable func-names */
import express from 'express';
import cors from 'cors';
import status from 'http-status';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import dbConnection from './Connection/dbConnect';
import Router from './Routes/Router';

import errorHandler from './Middlewares/errorHandler';
import verifyToken from './Middlewares/verifyToken';

dbConnection();

const app = express();

// initialize passport

app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(
	express.urlencoded({
		extended: false,
	}),
);

app.use(express.json());

app.use(verifyToken.verifyTokenSetUser);

app.get('/', (req, res) => {
	res.status(status.OK).send({ Message: 'Connected', status: status.OK });
});

app.use('/signup', Router.SignupRouter);

app.use('/signin', Router.SigninRouter);

app.use('/post', Router.ArticleRouter);

app.use('/comment', Router.CommentRouter);

app.use('/admin', Router.AdminRouter);

app.use('/category', Router.CategoryRouter);

app.use('/rating', Router.RatingRouter);

app.use('/user', Router.UserRouter);

app.use('/commentlike', Router.commentLikeRouter);

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App listening On port http://localhost:${port}`));
