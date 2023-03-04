const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    membersUpdatedTime: {
      type: Map,
      of: Date,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Conversation', ConversationSchema);
