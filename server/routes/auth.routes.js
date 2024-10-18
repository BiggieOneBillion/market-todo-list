const express = require("express");
const { register, login } = require("../controllers/auth.controller");
const {
  validateAuthRegister,
  validateAuthLogin,
} = require("../validation/auth.validation");

const router = express.Router();

router
  .post("/register", validateAuthRegister, register)
  .post("/login", validateAuthLogin, login);

module.exports = router;
