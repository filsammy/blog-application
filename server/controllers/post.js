const Post = require('../models/Post');
const { errorHandler } = require('../errorHandler');

// Create
exports.addPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const newPost = new Post({
      title,
      content,
      author: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
      }
    });

    const savedPost = await newPost.save();
    return res.status(201).json(savedPost);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// Get all posts (public)
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.status(200).json(posts);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// Get a single post by ID (public)
exports.getPostById = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    return res.status(200).json(post);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// Update
exports.updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check ownership
    if (post.author.id.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: "Forbidden: cannot edit this post" });
    }

    post.title = title || post.title;
    post.content = content || post.content;

    const updatedPost = await post.save();
    return res.status(200).json(updatedPost);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// Delete
exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check ownership
    if (post.author.id.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: "Forbidden: cannot delete this post" });
    }

    await Post.findByIdAndDelete(postId);
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    errorHandler(error, req, res);
  }
};
