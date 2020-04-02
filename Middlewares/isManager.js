const isManagerOwner = (req, res, next) => {
  if (!req.user) {
    res.status(400).send({
      Message: 'User not logged In.'
    });
    next();
  } else if (
    req.user.userType == 'Manager' ||
    req.user.userType == 'admin' ||
    req.user.userType === 'Owner'
  ) {
    return next();
  } else {
    res.status(400).send({
      Message: 'Restricted.'
    });
  }
};

module.exports = {
  isManagerOwner
};
