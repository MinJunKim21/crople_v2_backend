const express = require('express');
const passport = require('passport');
const router = express.Router();

if (process.env.NODE_ENV == 'development') {
  CLIENT_URL = 'http://localhost:3000';
} else if (process.env.NODE_ENV == 'production') {
  CLIENT_URL = 'https://croplev2.netlify.app';
}
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
  }
);

// @desc    Logout user
// @route   /googleauth/logout
// router.get('/logout', function (req, res, next) {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.redirect(process.env.DEV_CLIENT_URL || process.env.PROD_CLIENT_URL);
//   });
// });
router.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
});

module.exports = router;
