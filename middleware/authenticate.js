const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.status(401).json({ message: 'You must be logged in to perform this action' });
};

module.exports = { isAuthenticated };