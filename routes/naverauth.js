const express = require('express');
const passport = require('passport');
const router = express.Router();

if (process.env.NODE_ENV == 'development') {
  CLIENT_URL = 'http://localhost:3000';
} else if (process.env.NODE_ENV == 'production') {
  CLIENT_URL = 'https://croxple.com';
}

// @desc    Auth with Google
// @route   GET /googleauth/google
router.get('/naver', passport.authenticate('naver', { authType: 'reprompt' }));

// @desc    Google auth callback
// @route   GET /googleauth/google/callback
router.get(
  '/naver/callback',
  passport.authenticate('naver', { failureRedirect: 'https://croxple.com' }),
  (req, res) => {
    res.redirect('https://croxple.com');
  }
);

// @desc    Logout user
// @route   /googleauth/logout
router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('https://croxple.com');
  });
});
module.exports = router;
