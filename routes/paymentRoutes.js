// routes/stripeRoutes.js
const express = require('express');
const  bodyParser = require("body-parser");
const { createCheckoutSession, handleWebhook } = require('../controllers/paymentController');
const {verifyToken} = require("../middleware/auth")

const router = express.Router();
router.post('/create-stripe-session', verifyToken, createCheckoutSession);
router.post("/webhook", bodyParser.raw({ type: "application/json" }), handleWebhook);
module.exports = router;
