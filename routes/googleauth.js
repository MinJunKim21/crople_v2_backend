const express = require('express');
const passport = require('passport');
const router = express.Router();

const CLIENT_URL = 'http://localhost:3000';

// @desc    Auth with Google
// @route   GET /googleauth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @desc    Google auth callback
// @route   GET /googleauth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(CLIENT_URL);
    console.log('hi');
  }
);

// @desc    Logout user
// @route   /googleauth/logout
router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('http://localhost:3000/');
  });
});
module.exports = router;
