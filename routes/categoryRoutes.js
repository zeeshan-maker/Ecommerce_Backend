const express = require("express");
const router = express.Router();
const {isAdmin, verifyToken} = require("../middleware/auth")
const { createCategory, getAllCategory} = require("../controllers/categoryController");

router.post("/",verifyToken, isAdmin, createCategory);
router.get("/",verifyToken, isAdmin, getAllCategory);


module.exports = router;