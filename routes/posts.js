// server/routes/posts.js

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const postController = require("../controllers/postController");

// PUBLIC ROUTES (No login required)
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);

// PROTECTED ROUTES (Login required)
router.post("/create", authMiddleware, postController.createPost);
router.put("/:id", authMiddleware, postController.updatePost);
router.delete("/:id", authMiddleware, postController.deletePost);

module.exports = router;