const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  image: { type: String }, // Optional image URL
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who liked the post
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // Associated comments
  shares: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who shared the post
  savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who saved the post
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);