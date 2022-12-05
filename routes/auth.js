// const express = require('express');
// const passport = require('passport');
// const router = express.Router();

// const CLIENT_URL = 'http://localhost:3000';

// // @desc    Auth with Google
// // @route   GET /auth/google
// router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// // @desc    Google auth callback
// // @route   GET /auth/google/callback
// router.get(
//   '/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     res.redirect(CLIENT_URL);
//     console.log('hi');
//   }
// );

// // @desc    Logout user
// // @route   /auth/logout
// router.get('/logout', function (req, res, next) {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.redirect('http://localhost:3000/');
//   });
// });
// module.exports = router;

const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//register
router.post('/register', async (req, res) => {
  try {
    //generate enw password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json('user not found');

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json('wrong password');

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
