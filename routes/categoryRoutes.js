const express = require("express");
const router = express.Router();
const {isAdmin, verifyToken} = require("../middleware/auth")
const { createCategory} = require("../controllers/categoryController");

router.post("/",verifyToken, isAdmin, createCategory);


module.exports = router;