const GoogleStrategy = require('passport-google-oauth20').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const {
  Strategy: NaverStrategy,
  Profile: NaverProfile,
} = require('passport-naver-v2');

const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/googleauth/google/callback',
        scope: ['profile'],
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          // displayName: profile.displayName,
          // firstName: profile.name.givenName,
          // lastName: profile.name.familyName,
          // image: profile.photos[0].value,
          username: profile.displayName,
          email: profile.email,
        };

        try {
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_CLIENT_ID,
        clientSecret: process.env.NAVER_CLIENT_SECRET,
        callbackURL: '/naverauth/naver/callback', // 위에서 설정한 Redirect URI
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          naverId: profile.id,
          // displayName: profile.displayName,
          // firstName: profile.name.givenName,
          // lastName: profile.name.familyName,
          // image: profile.photos[0].value,
          username: profile.username,
          email: profile.email,
        };

        try {
          let user = await User.findOne({ naverId: profile.id });

          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID,
        callbackURL: '/kakaoauth/kakao/callback', // 위에서 설정한 Redirect URI
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          kakaoId: profile.id,
          // displayName: profile.displayName,
          // firstName: profile.name.givenName,
          // lastName: profile.name.familyName,
          // image: profile.photos[0].value,
          username: profile.username,
          email: profile.email,
        };

        try {
          let user = await User.findOne({ kakaoId: profile.id });

          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // User.findById(id, (err, user) => done(err, user));
    done(null, user.id);
  });
};
