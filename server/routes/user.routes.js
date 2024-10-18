const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth-middleware"); // Auth middleware
const {
  getUserInfo,
  updateUserInfo,
} = require("../controllers/user.controllers");
const { validateUserUpdate } = require("../validation/user.validation");

// These routes are (Protected route)
router
  .get("/me", authMiddleware, getUserInfo)
  .put("/me", authMiddleware, validateUserUpdate, updateUserInfo);

module.exports = router;
