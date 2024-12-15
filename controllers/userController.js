const User = require('../models/User');

// Upload profile picture
exports.uploadProfilePicture = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.profilePicture = `/uploads/profile-pictures/${req.file.filename}`;
    await user.save();

    res.status(200).json({ success: true, message: 'Profile picture updated', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    if (!userToFollow) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (currentUser.following.includes(userToFollow._id)) {
      // Unfollow
      currentUser.following.pull(userToFollow._id);
      userToFollow.followers.pull(currentUser._id);
    } else {
      // Follow
      currentUser.following.push(userToFollow._id);
      userToFollow.followers.push(currentUser._id);
    }

    // Check if the user should be verified
    if (userToFollow.followers.length >= 200000) {
      userToFollow.verified = true;
    } else {
      userToFollow.verified = false;
    }

    await currentUser.save();
    await userToFollow.save();

    res.status(200).json({
      success: true,
      message: currentUser.following.includes(userToFollow._id)
        ? 'User followed successfully'
        : 'User unfollowed successfully',
      following: currentUser.following,
      followers: userToFollow.followers,
      verified: userToFollow.verified,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
