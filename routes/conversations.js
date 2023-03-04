const router = require('express').Router();
const Conversation = require('../models/Conversation');

//new conv

router.post('/', async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get('/:userId', async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // get conv includes two userId

router.get('/find/:firstUserId/:secondUserId', async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get info of a conversation by convId
router.get('/find/:id', async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update the updatedAt 채팅방 최근 접속 시간을 기록하기 위하여
router.put('/updatetime/:id', async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    const memberId = req.body.memberId;
    conversation.membersUpdatedTime.set(memberId, new Date());
    await conversation.save();
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
