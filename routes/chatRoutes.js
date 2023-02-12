const express = require('express');
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require('../controllers/chatControllers');
const { ensureAuthenticated } = require('../config/ensureAuthenticated.js');

const router = express.Router();

// router.route('/').post(ensureAuthenticated, accessChat);
//모두 ensure모드로 바꾸어야함
router.route('/').post(accessChat);
// router.route('/').get(fetchChats);
// router.route('/group').post(createGroupChat);
// router.route('/rename').put(renameGroup);
// router.route('/groupremove').put(removeFromGroup);
// router.route('/groupadd').put(addToGroup);

module.exports = router;
