const asyncHandler = require('express-async-handler');

const ensureAuthenticated = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) return next();
});

module.exports = { ensureAuthenticated };
