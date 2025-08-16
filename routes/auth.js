const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");

// Route for user registration
// When a POST request is made to '/api/auth/register', call the register function
router.post("/register", authController.register);

// Route for user login
// When a POST request is made to '/api/auth/login', call the login function
router.post("/login", authController.login);

module.exports = router;