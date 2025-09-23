const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
const auth = require('../auth');

const { verify, verifyAdmin } = auth;

router.post('/post/:postId', verify, commentController.createComment);

router.get("/", verify, verifyAdmin, commentController.getAllComments);

router.get('/post/:postId', commentController.getCommentsByPost);

router.patch('/:commentId', verify, commentController.updateComment);

router.delete('/:commentId', verify, commentController.deleteComment);

module.exports = router;
