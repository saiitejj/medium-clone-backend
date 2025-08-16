// server/controllers/postController.js

const Post = require("../models/Post");

// --- CREATE A NEW POST ---
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new Post({
      title,
      content,
      author: req.user.userId, // This comes from the authMiddleware
    });
    await newPost.save();
    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    res.status(500).json({ message: "Error creating post", error: err.message });
  }
};

// --- GET ALL POSTS ---
exports.getAllPosts = async (req, res) => {
  try {
    // .populate() will replace the author's ID with their name from the User collection
    // .sort() will show the newest posts first
    const posts = await Post.find().populate("author", "name").sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts", error: err.message });
  }
};

// --- GET A SINGLE POST BY ITS ID ---
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Error fetching post", error: err.message });
  }
};

// --- UPDATE A POST ---
exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Make sure the user trying to update is the original author
    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "User not authorized to update this post" });
    }

    post.title = title;
    post.content = content;
    await post.save();

    res.status(200).json({ message: "Post updated successfully", post });
  } catch (err) {
    res.status(500).json({ message: "Error updating post", error: err.message });
  }
};

// --- DELETE A POST ---
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Make sure the user trying to delete is the original author
    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "User not authorized to delete this post" });
    }

    await Post.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting post", error: err.message });
  }
};