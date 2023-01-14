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
router.get('/kakao', passport.authenticate('kakao'));

// @desc    Google auth callback
// @route   GET /googleauth/google/callback
router.get(
  '/kakao/callback',
  //? 그리고 passport 로그인 전략에 의해 kakaoStrategy로 가서 카카오계정 정보와 DB를 비교해서 회원가입시키거나 로그인 처리하게 한다.
  passport.authenticate('kakao', {
    failureRedirect: '/', // kakaoStrategy에서 실패한다면 실행
  }),
  // kakaoStrategy에서 성공한다면 콜백 실행
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
    res.redirect('CLIENT_URL');
  });
});
module.exports = router;
