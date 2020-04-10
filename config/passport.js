import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

import FacebookStrategy from 'passport-facebook';

import Model from '../Models/Model';

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_AUTH_CLIENTID,
			clientSecret: process.env.GOOGLE_AUTH_SECRETID,
			callbackURL: 'http://localhost:3000/signIn/google/redirect',
		},
		(token, tokenSecret, profile, done) => {
			Model.UserModel()
				.findOne({ googleId: profile.googleId })
				.then(user => {
					if (user) {
						console.log('Current User is', user);
						done(null, user);
					} else {
						const newUser = new Model.UserModel({
							name: profile.displayName,
							googleId: profile.googleId,
						});
						newUser.save().then(savedUser => {
							done(null, savedUser);
						});
					}
				});
		},
	),
);

passport.use(
	new FacebookStrategy(
		{
			clientID: '',
			clientSecret: '',
			callbackURL: '',
		},
		(token, tokenSecret, profile, done) => {
			// Model.UserModel()
			// 	.findOne({ facebookId: profile.googleId })
			// 	.then(user => {
			// 		if (user) {
			// 			console.log('Current User is', user);
			// 			done(null, user);
			// 		} else {
			// 			const newUser = new Model.UserModel({
			// 				name: profile.displayName,
			// 				googleId: profile.googleId,
			// 			});
			// 			newUser.save().then(savedUser => {
			// 				done(null, savedUser);
			// 			});
			// 		}
			// 	});
		},
	),
);
