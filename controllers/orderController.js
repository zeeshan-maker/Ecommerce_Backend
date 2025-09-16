const {
  Order,
  OrderItem,
  Product,
  ShippingAddress,
  Payment,
  User,
} = require("../models/index.js");
const stripe = require("../config/stripe.js");
require("dotenv").config();

// Placing order using COD Method
exports.placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const user_id = req.user.user_id;

    // Create Order
    const order = await Order.create({ user_id: user_id, totalAmount: amount });

    // Create OrderItems
    for (let item of items) {
      const product = await Product.findByPk(item.product_id);
      await OrderItem.create({
        order_id: order.order_id,
        product_id: item.product_id,
        quantity: item.quantity,
        size: item.size,
        price: product.price,
      });
    }

    // Create Order address
    let shippingData = {
      order_id: order.order_id,
      address: address.address,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      phone: address.phone,
    };
    await ShippingAddress.create(shippingData);

    // Create Pyament
    await Payment.create({
      order_id: order.order_id,
      paymentMethod: "cod",
      amount: amount,
      paymentStatus: "pending",
    });

    // await Order.create(orderData);
    return res.status(200).json({ status: 200, message: "Order Placed." });
  } catch (error) {
    return res.status(500).json({ status: 500, error: error.message });
  }
};

// Placing Orders using Stripe Method
exports.placeOrderStripe = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const user_id = req?.user.user_id;

    // Create Order
    const order = await Order.create({ user_id: user_id, totalAmount: amount });

    // Create OrderItems
    for (let item of items) {
      const product = await Product.findByPk(item.product_id);
      await OrderItem.create({
        order_id: order.order_id,
        product_id: item.product_id,
        quantity: item.quantity,
        size: item.size,
        price: product.price,
      });
    }

    // Create Order address
    let shippingData = {
      order_id: order.order_id,
      address: address.address,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      phone: address.phone,
    };
    await ShippingAddress.create(shippingData);

    // Create Pyament
    await Payment.create({
      order_id: order.order_id,
      paymentMethod: "stripe",
      amount: amount,
      paymentStatus: "pending",
    });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },

      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.CLIENT_URL}/verify?success=true&order_id=${order.order_id}`,
      cancel_url: `${process.env.CLIENT_URL}/verify?success=false&order_id=${order.order_id}`,
      line_items,
      mode: "payment",
    });

    return res
      .status(200)
      .json({ status: 200, success: true, session_url: session.url });
  } catch (error) {
    return res.status(500).json({ status: 500, error: error.message });
  }
};

// Verify Stripe
exports.verifyStripe = async (req, res) => {
  const { order_id, success } = req.body;
  try {
    if (success === "true") {
      // Find payment record
      const payment = await Payment.findOne({ where: { order_id } });
      if (!payment) {
        return res
          .status(404)
          .json({ status: 404, message: "Payment not found" });
      }
      payment.paymentStatus = "paid";
      await payment.save();
      return res
        .status(200)
        .json({ status: 200, success: true, message: "Payment updated" });
    } else {
      const order = await Order.findByPk(order_id);
      if (!order) {
        return res
          .status(404)
          .json({ status: 404, success: false, message: "Order not found" });
      }
      await order.destroy();
      return res
        .status(200)
        .json({
          status: 200,
          success: false,
          message: "Order deleted successfully",
        });
    }
  } catch (error) {
    return res.status(500).json({ status: 500, error: error.message });
  }
};

// Placing Orders using Razorepay Method
exports.placeOrderRazorpay = async (req, res) => {
  return res
    .status(200)
    .json({ status: 200, message: "Order Placed with Razorpay." });
};

// All Orders data for Admin
exports.allOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
            },
          ],
        },
        {
          model: Payment,
        },
      ],
    });
    return res.status(200).json({ status: 200, orders });
  } catch (error) {
    return res.status(500).json({ status: 500, error: error.message });
  }
};

// User Order Data For  Frontend
exports.userOrders = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const orders = await Order.findAll({
      where: { user_id },
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
            },
          ],
        },
        {
          model: Payment,
        },
      ],
    });
    return res.status(200).json({ status: 200, orders });
  } catch (error) {
    return res.status(500).json({ status: 500, error: error.message });
  }
};

exports.trackOrder = async (req, res) => {
  try {
    const { order_id } = req.params;
    const order = await Order.findOne({ where: { order_id } });
    return res.status(200).json({ status: 200, order });
  } catch (error) {
    return res.status(500).json({ status: 500, error: error.message });
  }
};

// update order status from Admin panel
exports.updateStatus = async (req, res) => {
  try {
      const {orderId, newStatus} = req.body;
      const order= await Order.update(
      {orderStatus:newStatus},
      {where:{order_id:orderId}}
      )
      if(order.length === 0){
        return res.status(404).json({ status: 404, message: "Order not found" });
      }
     return res.status(200).json({status:200, message:"Order Status Updated!"})
    
  } catch (error) {
    return res.status(500).json({status:500, error:error.message})
    
  }
};
