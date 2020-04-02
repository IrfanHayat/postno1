const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(400).send({
      Message: 'User not logged In.'
    });
  }
};

module.exports = {
  isLoggedIn
};
