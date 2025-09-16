const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middleware/auth")
const { register, login, verifyUser,forgotPassword, resetPassword, updateProfileImage } = require("../controllers/authController");
const upload = require("../middleware/multer");

router.post("/register",register);
router.post("/login",login);
router.get("/verify-user/:token",verifyUser);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password/:token",resetPassword);
router.put("/update-profile",verifyToken,upload.single("profileImage"),updateProfileImage);

module.exports = router;