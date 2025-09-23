const Comment = require('../models/Comment');
const { errorHandler } = require('../errorHandler');

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { postId } = req.params; // Get post ID from URL params
    const { comment } = req.body;  // Only comment content from body
    const userId = req.user.id;    // Get user ID from JWT token

    const newComment = new Comment({
      postId,
      userId,
      comment
    });

    const savedComment = await newComment.save();
    return res.status(201).json(savedComment);

  } catch (error) {
    errorHandler(error, req, res);
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    return res.status(200).json(comments);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// Get all comments for a specific post
exports.getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    return res.status(200).json(comments);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// Update a comment
exports.updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { comment } = req.body;

    // First find the comment to check ownership
    const existingComment = await Comment.findById(commentId);
    if (!existingComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user owns the comment or is admin
    if (existingComment.userId !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Forbidden: cannot edit this comment' });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { comment },
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedComment);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    // First find the comment to check ownership
    const existingComment = await Comment.findById(commentId);
    if (!existingComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user owns the comment or is admin
    if (existingComment.userId !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Forbidden: cannot delete this comment' });
    }

    await Comment.findByIdAndDelete(commentId);
    return res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    errorHandler(error, req, res);
  }
};
