const express = require('express');
const router = express.Router();
const passport = require('passport');

// GitHub login route
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub callback route
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

// Logout route
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  });
});

// Get current user
router.get('/current-user', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      displayName: req.user.displayName,
      username: req.user.username,
      id: req.user.id
    });
  } else {
    res.status(401).json({ message: 'Not logged in' });
  }
});

module.exports = router;