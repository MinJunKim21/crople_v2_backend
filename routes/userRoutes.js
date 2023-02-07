const express = require('express');
const { allUsers } = require('../controllers/userControllers');
const { ensureAuthenticated } = require('../config/ensureAuthenticated.js');

const router = express.Router();

router.route('/').get(allUsers);
// router.route('/').get(ensureAuthenticated, allUsers);

module.exports = router;
