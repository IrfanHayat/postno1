import Model from '../Models/Model';

const getUsers = (req, res, next) => {
	Model.UserModel.find()
		.then(users => {
			res.status(200).send({ users });
		})
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

export default { getUsers, deleteUser };
