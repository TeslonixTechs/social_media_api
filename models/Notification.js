const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Notification receiver
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Notification creator
  type: { type: String, required: true }, // e.g., 'like', 'comment', 'share'
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, // Associated post
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);