// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   googleId: {
//     type: String,
//     required: true,
//   },
//   displayName: {
//     type: String,
//     required: true,
//   },
//   firstName: {
//     type: String,
//     required: true,
//   },
//   lastName: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model('User', UserSchema);

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    nickName: {
      type: String,
      required: false,
      unique: true,
    },
    googleId: {
      type: String,
      required: false,
    },
    kakaoId: {
      type: String,
      required: false,
    },
    naverId: {
      type: String,
      required: false,
    },
    likeSports: {
      type: Array,
      default: [],
    },
    locations: {
      type: Array,
      default: [],
    },
    showGender: {
      type: String,
      required: false,
    },

    displayName: {
      type: String,
      required: false,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      require: false,

      unique: true,
    },
    email: {
      type: String,
      required: false,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: false,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    img: {
      type: String,
      default: '',
    },
    coverPicture: {
      type: String,
      default: '',
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    // city: {
    //   type: String,
    //   max: 50,
    // },
    // from: {
    //   type: String,
    //   max: 50,
    // },
    // relationship: {
    //   type: Number,
    //   enum: [1, 2, 3],
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
