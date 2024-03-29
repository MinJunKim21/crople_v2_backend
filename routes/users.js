const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { ensureAuthenticated } = require('../config/ensureAuthenticated.js');

//update user
router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json('Account has been updated');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can update only your account');
  }
});

//delete user
router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json('Account has been deleted');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can delete only your account');
  }
});

//get a user
router.get('/', async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    // : await User.findOne({ nickName: nickName });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});
// router.get('/', async (req, res) => {
//   const _id = req.query._id;
//   const nickName = req.query.nickName;
//   try {
//     const user = _id && (await User.findById(_id));
//     // : await User.findOne({ nickName: nickName });
//     const { password, updatedAt, ...other } = user._doc;
//     res.status(200).json(other);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//get all user
router.get('/all', async (req, res) => {
  // router.get('/all', ensureAuthenticated, async (req, res) => {
  try {
    User.find({}, (err, result) => {
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get recommend users
router.get('/recommend', async (req, res) => {
  try {
    const { userId } = req.query;

    // Find all users except for the logged-in user
    const users = await User.find({ _id: { $ne: userId } });

    // Get a random sample of 9 users
    const recommendedUsers = _.sampleSize(users, 9);

    res.send(recommendedUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get following friends
router.get('/friends/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get following each other friends
router.get('/friendsearch/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    console.log(friends, 'friendsearch for friend each other is here');
    let friendList = [];
    friends.map((friend) => {
      const {
        _id,
        username,
        profilePicture,
        followings,
        nickName,
        likeSports,
        locations,
      } = friend;
      if (followings.includes(user._id)) {
        friendList.push({
          _id,
          username,
          profilePicture,
          followings,
          nickName,
          likeSports,
          locations,
        });
      }
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a user
router.put('/:id/follow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json('user has been followed');
      } else {
        res.status(403).json('you allready follow this user');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('you cant follow yourself');
  }
});

//unfollow a user
router.put('/:id/unfollow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({
          $pull: { followings: req.params.id },
        });
        res.status(200).json('user has been unfollowed');
      } else {
        res.status(403).json('you already unfollowed this user');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('you cant unfollow yourself');
  }
});

module.exports = router;
