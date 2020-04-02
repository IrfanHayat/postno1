const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		// name: {
		// 	type: String,
		// 	required: true,
		// },
		// userName: {
		// 	type: String,
		// },
		password: {
			type: String,
		},
		email: {
			type: String,
		},
		userType: {
			type: String,
			default: 'user',
		},
		imageUrl: {
			type: String,
			default: '',
		},
		// gender: {
		// 	type: String,
		// },
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('User', userSchema);
