const sequelize = require("../config/db");

// Import all models
const User = require("./User");
const Category = require("./Category");
const Brand = require("./Brand");
const Product = require("./Product");
const Cart = require("./Cart");
const CartItem = require("./CartItem");
const Order = require("./Order");
const OrderItem = require("./OrderItem");
const Payment = require("./Payment");
const ShippingAddress = require("./Shipping");
const Review = require("./Review");
const Wishlist = require("./Wishlist");
const Notification = require("./Notification");

/* ==========================
   CATEGORY ↔ PRODUCT
========================== */
Category.hasMany(Product, { foreignKey: "category_id", onDelete: "CASCADE", onUpdate: "CASCADE" });
Product.belongsTo(Category, { foreignKey: "category_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   BRAND ↔ PRODUCT
========================== */
Brand.hasMany(Product, { foreignKey: "brand_id", onDelete: "CASCADE", onUpdate: "CASCADE" });
Product.belongsTo(Brand, { foreignKey: "brand_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   USER ↔ CART
========================== */
User.hasOne(Cart, { foreignKey: "user_id", onDelete: "CASCADE", onUpdate: "CASCADE" });
Cart.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   CART ↔ CARTITEM
========================== */
Cart.hasMany(CartItem, { foreignKey: "cart_id", onDelete: "CASCADE", onUpdate: "CASCADE" });
CartItem.belongsTo(Cart, { foreignKey: "cart_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   PRODUCT ↔ CARTITEM
========================== */
Product.hasMany(CartItem, { foreignKey: "product_id", onDelete: "CASCADE", onUpdate: "CASCADE" });
CartItem.belongsTo(Product, { foreignKey: "product_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   USER ↔ ORDER
========================== */
User.hasMany(Order, { foreignKey: "user_id", onDelete: "CASCADE", onUpdate: "CASCADE" });
Order.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   ORDER ↔ ORDERITEM
========================== */
Order.hasMany(OrderItem, { foreignKey: "order_id", onDelete: "CASCADE", onUpdate: "CASCADE" });
OrderItem.belongsTo(Order, { foreignKey: "order_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   PRODUCT ↔ ORDERITEM
========================== */
Product.hasMany(OrderItem, { foreignKey: "product_id", onDelete: "CASCADE", onUpdate: "CASCADE" });
OrderItem.belongsTo(Product, { foreignKey: "product_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   ORDER ↔ PAYMENT
========================== */
Order.hasOne(Payment, { foreignKey: "order_id", onDelete: "CASCADE", onUpdate: "CASCADE" });
Payment.belongsTo(Order, { foreignKey: "order_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   USER ↔ SHIPPINGADDRESS
========================== */
User.hasMany(ShippingAddress, { foreignKey: "user_id", onDelete: "CASCADE", onUpdate: "CASCADE" });
ShippingAddress.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   ORDER ↔ SHIPPINGADDRESS
========================== */
Order.belongsTo(ShippingAddress, { foreignKey: "shippingAddress_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   USER ↔ REVIEW
========================== */
User.hasMany(Review, { foreignKey: "user_id", onDelete: "CASCADE", onUpdate: "CASCADE" });
Review.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   PRODUCT ↔ REVIEW
========================== */
Product.hasMany(Review, { foreignKey: "product_id", onDelete: "CASCADE", onUpdate: "CASCADE" });
Review.belongsTo(Product, { foreignKey: "product_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   USER ↔ WISHLIST
========================== */
User.hasMany(Wishlist, { foreignKey: "user_id", onDelete: "CASCADE", onUpdate: "CASCADE" });
Wishlist.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   PRODUCT ↔ WISHLIST
========================== */
Product.hasMany(Wishlist, { foreignKey: "product_id", onDelete: "CASCADE", onUpdate: "CASCADE" });
Wishlist.belongsTo(Product, { foreignKey: "product_id", onDelete: "CASCADE", onUpdate: "CASCADE" });


/* ==========================
   USER ↔ NOTIFICATION
========================== */
User.hasMany(Notification, { foreignKey: "user_id", onDelete: "CASCADE", onUpdate: "CASCADE" });
Notification.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

module.exports = {
  sequelize,
  User,
  Category,
  Brand,
  Product,
  Cart,
  CartItem,
  Order,
  OrderItem,
  Payment,
  ShippingAddress,
  Review,
  Wishlist,
  Notification
};
