const express = require('express');
const  { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders,updateStatus, userOrders,verifyStripe} = require("../controllers/orderController");
const {verifyToken, isAdmin} = require("../middleware/auth")
const router = express.Router();

// admin features
router.get("/list",verifyToken, isAdmin, allOrders);
router.post("/update-status", verifyToken, isAdmin, updateStatus);

// Payment Features
router.post("/place", verifyToken, placeOrder);
router.post("/stripe", verifyToken, placeOrderStripe);
router.post("/razorpay", verifyToken, placeOrderRazorpay);


// user feature
router.get("/user-order",verifyToken, userOrders)

// verify payment
router.post("/verify-stripe", verifyToken, verifyStripe)


module.exports = router;