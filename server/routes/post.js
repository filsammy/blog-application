const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const auth = require('../auth');

const { verify, verifyAdmin } = auth;

router.post('/', verify, postController.addPost);

router.get('/', postController.getPosts);

router.get('/:postId', postController.getPostById);

router.patch('/:postId', verify, postController.updatePost);

router.delete('/:postId', verify, postController.deletePost);

module.exports = router;
