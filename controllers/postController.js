const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { createNotification } = require('../utils/notificationHelper');

// Create a post
exports.createPost = async (req, res) => {
  try {
    const { content, image } = req.body;
    const post = await Post.create({ user: req.user.id, content, image });
    res.status(201).json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Like or unlike a post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    if (post.likes.includes(req.user.id)) {
      post.likes.pull(req.user.id);
    } else {
      post.likes.push(req.user.id);
    }

    await post.save();
    res.status(200).json({ success: true, likes: post.likes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Save or unsave a post
exports.savePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    if (post.savedBy.includes(req.user.id)) {
      post.savedBy.pull(req.user.id);
    } else {
      post.savedBy.push(req.user.id);
    }

    await post.save();
    res.status(200).json({ success: true, savedBy: post.savedBy });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Share a post
exports.sharePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    if (post.shares.includes(req.user.id)) {
      return res.status(400).json({ success: false, message: 'You have already shared this post' });
    }
    post.shares.push(req.user.id);
    await post.save();

    // Create a notification for the post owner
    await createNotification(post.user, req.user.id, 'share', post._id, `${req.user.name} shared your post`);

    res.status(200).json({ success: true, message: 'Post shared successfully', shares: post.shares });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
