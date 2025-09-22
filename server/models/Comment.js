const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posts',
    required: true
  },
  userId: {
    type: String,
    required: [true, 'User ID is required']
  },
  comment: {
    type: String,
    required: [true, 'Comment is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comments', commentSchema);
