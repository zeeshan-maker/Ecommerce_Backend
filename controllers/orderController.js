const {
  Order,
  OrderItem,
  Product,
  ShippingAddress,
  Payment,
} = require("../models/Index");
const stripe = require("../config/stripe.js");
const currency = "inr";
const deliveryCharge = 10;

// Placing order using COD Method
exports.placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const user_id = req.user.user_id;

    const orderData = {
      user_id,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

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

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },

      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
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

// Placing Orders using Razorepay Method
exports.placeOrderRazorpay = async (req, res) => {
  return res
    .status(200)
    .json({ status: 200, message: "Order Placed with Razorpay." });
};

// All Orders data for Admin
exports.allOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    return res.status(200).json({ status: 200, orders: orders });
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
      include: [{ model: OrderItem }],
    });
    return res.status(200).json({ status: 200, orders });
  } catch (error) {
    return res.status(500).json({ status: 500, error: error.message });
  }
};

// update order status from Admin panel
exports.updateStatus = async (req, res) => {};
