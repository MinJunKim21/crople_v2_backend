const asyncHandler = require('express-async-handler');
const User = require('../models/User');

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { nickName: { $regex: req.query.search, $options: 'i' } },
          // { email: { $regex: req.query.search, $options: 'i' } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user?._id } });
  const currentUser = await User.findById(req.body.userId);
  console.log(currentUser);
  res.send(users);
});

module.exports = { allUsers };
