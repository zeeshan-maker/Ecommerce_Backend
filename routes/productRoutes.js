const express = require("express");
const router = express.Router();
const {isAdmin, verifyToken} = require("../middleware/auth")
const { createProduct, getAllProduct, deleteById, getProductById} = require("../controllers/productController");
const upload = require("../middleware/multer");


router.post("/",verifyToken, isAdmin,upload.array("images", 5), createProduct);
router.get("/", getAllProduct);
router.get("/:product_id", getProductById);
router.delete("/:product_id",verifyToken,isAdmin,deleteById)


module.exports = router;