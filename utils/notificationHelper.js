const Notification = require('../models/Notification');

exports.createNotification = async (user, fromUser, type, post, message) => {
  try {
    await Notification.create({
      user,
      fromUser,
      type,
      post,
      message,
    });
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};