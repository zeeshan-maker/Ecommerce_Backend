const {Order, OrderItem, ShippingAddress, Payment } = require("../models/Index")
const stripe = require("../config/stripe.js");
const currency='inr'
const deliveryCharge=10

// Placing order using COD Method
exports.placeOrder =  async (req, res)=>{
    try {
        const { items, amount, address} = req.body;
        const user_id = req.user.user_id
        const orderData = {
            user_id,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment: false,
            date: Date.now()
        }

        // await Order.create(orderData);
        return res.status(200).json({status:200, message: "Order Placed."})
    } catch (error) {
        return res.status(500).json({status:500, error: error.message})
    }
}

// Placing Orders using Stripe Method
exports.placeOrderStripe =  async (req, res)=>{
   try {
     const { items, amount, address} = req.body;
    const user_id = req?.user.user_id;
     const orderData = {
            user_id,
            items,
            amount,
            address,
            paymentMethod:"stripe",
            date: Date.now()
        }

        const line_items = items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name
                },
                unit_amount:item.price *100
            },
            quantity: items.quantity
        }))


        line_items.push({
              price_data:{
                currency:currency,
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:deliveryCharge *100
            },
            quantity: 1
        })


        // const session = await stripe.chekout.session.create({
        //     success_url: "http://localhost:3000/success",
        //     cancel_url: "http://localhost:3000/cancel",
        //     line_items,
        //     mode:"payment"
        // })

        return res.status(200).json({status:200, message:"Place Order with stripe"})
   } catch (error) {
    return res.status(500).json({status:500, error:error.message})
   }


}


// Placing Orders using Razorepay Method
exports.placeOrderRazorpay =  async (req, res)=>{
     return res.status(200).json({status:200, message: "Order Placed with Razorpay."})
}



// All Orders data for Admin
exports.allOrders =  async (req, res)=>{
     try {
        const orders = await Order.findAll();   
        return res.status(200).json({status:200, orders:orders})
    } catch (error) {
        return res.status(500).json({status:500, error:error.message})
    }
}

// User Order Data For  Frontend
exports.userOrders =  async (req, res)=>{
    try {
        const  user_id = req.user.user_id;
        const orders = await Order.findAll({
            where: { user_id },
             include: [{ model: OrderItem }]
           });    
        return res.status(200).json({status:200, orders})
    } catch (error) {
        return res.status(500).json({status:500, error:error.message})
    }
}

// update order status from Admin panel
exports.updateStatus =  async (req, res)=>{
}