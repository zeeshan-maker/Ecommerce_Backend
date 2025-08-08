const express = require("express");
const router = express.Router();
const {isAdmin, verifyToken} = require("../middleware/auth")
const { createProduct} = require("../controllers/productController");
const upload = require("../middleware/multer");
router.post("/",verifyToken, isAdmin,upload.array("images", 5), createProduct);


module.exports = router;