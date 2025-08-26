// server/controllers/userController.js

const User = require('../models/User');
const Post = require('../models/Post');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // .select('-password') excludes the password hash

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 });

    res.status(200).json({ user, posts });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
};