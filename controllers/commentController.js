const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Add a comment
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    const comment = await Comment.create({ user: req.user.id, post: req.params.postId, content });
    post.comments.push(comment._id);
    await post.save();

    res.status(201).json({ success: true, comment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};