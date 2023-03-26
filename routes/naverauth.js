const express = require('express');
const passport = require('passport');
const router = express.Router();

if (process.env.NODE_ENV == 'development') {
  CLIENT_URL = 'http://localhost:3000';
} else if (process.env.NODE_ENV == 'production') {
  CLIENT_URL = 'https://croxple.com/beta';
}

// @desc    Auth with Google
// @route   GET /googleauth/google
router.get('/naver', passport.authenticate('naver', { authType: 'reprompt' }));

// @desc    Google auth callback
// @route   GET /googleauth/google/callback
router.get(
  '/naver/callback',
  passport.authenticate('naver', { failureRedirect: CLIENT_URL }),
  (req, res) => {
    res.redirect(CLIENT_URL);
  }
);

// @desc    Logout user
// @route   /googleauth/logout
router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(CLIENT_URL);
  });
});
module.exports = router;
