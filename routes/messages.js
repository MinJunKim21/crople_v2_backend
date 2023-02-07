const router = require('express').Router();
const Message = require('../models/Message');

//add
// http://localhost:5001/api/messages body에 conversationId, sender, text 적어서 post, message 보내짐
router.post('/', async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get
// http://localhost:5001/api/messages/63e1cb9369f68be27abbabc8 해당 conversationId로 대화를 가져오면 위의 메세지 주고받은 conversation 가져와짐
router.get('/:conversationId', async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
