const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
const auth = require('../auth');

const { verify } = auth;

// Create a comment for a specific post
router.post('/post/:postId', verify, commentController.createComment);

// Get all comments for a specific post
router.get('/post/:postId', commentController.getCommentsByPost);

// Update a specific comment
router.patch('/:commentId', verify, commentController.updateComment);

// Delete a specific comment
router.delete('/:commentId', verify, commentController.deleteComment);

module.exports = router;