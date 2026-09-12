const Post = require('../models/Post');

// CREATE
exports.createPost = async (req, res) => {
  try {
    // Task 3 & 4: Attach the logged-in user's ID to the post
    const post = await Post.create({ ...req.body, userId: req.user._id });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ALL
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('userId', 'username');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE (Task 5: Ownership check)
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Task 5: Check ownership
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized to edit this post' });
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE (Task 5: Ownership check)
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Task 5: Check ownership
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized to delete this post' });
    }

    await post.deleteOne();
    res.json({ message: 'Post removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};