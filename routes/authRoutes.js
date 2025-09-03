const express = require("express");
const router = express.Router();

const { register, login, verifyUser,forgotPassword, resetPassword } = require("../controllers/authController");

router.post("/register",register);
router.post("/login",login);
router.get("/verify-user/:token",verifyUser);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password/:token",resetPassword);

module.exports = router;