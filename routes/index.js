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
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Get current user
router.get('/current-user', (req, res) => {
  if (req.session.user) {
    res.status(200).json({
      displayName: req.session.user.displayName,
      username: req.session.user.username,
      id: req.session.user.id
    });
  } else {
    res.status(401).json({ message: 'Not logged in' });
  }
});

module.exports = router;