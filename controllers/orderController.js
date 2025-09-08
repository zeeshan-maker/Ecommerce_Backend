const {Order, OrderItem, ShippingAddress, Payment } = require("../models/Index")


// Placing order using COD Method
exports.placeOrder =  async (req, res)=>{
    try {
        const { user_id, items, amount, address} = req.body;
        const orderData = {
            user_id,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment: false,
            date: Date.now()
        }

        await Order.create(orderData);
        return res.status(200).json({status:200, message: "Order Placed."})
    } catch (error) {
        return res.status(500).json({status:500, error: error.message})
    }
}

// Placing Orders using Stripe Method
exports.placeOrderStripe =  async (req, res)=>{
}


// Placing Orders using Razorepay Method
exports.placeOrderRazorepay =  async (req, res)=>{
}



// All Orders data for Admin
exports.allOrders =  async (req, res)=>{
}

// User Order Data For  Frontend
exports.userOrders =  async (req, res)=>{
}

// update order status from Admin panel
exports.updateStatus =  async (req, res)=>{
}