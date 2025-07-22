const express = require("express");
const router = express.Router();

// Dummy route to test
router.get("/", (req, res) => {
  res.send("Posts route working");
});

module.exports = router; // ✅ important
