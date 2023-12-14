const express = require("express");

const {
  handleSignup,
  handleLogin,
  handleLogout,
} = require("../controllers/teacherController");

const router = express.Router();

// Signup
router.post("/signup", handleSignup);

// Login
router.post("/login", handleLogin);

// Logout
router.post("/logout", handleLogout);

module.exports = router;
