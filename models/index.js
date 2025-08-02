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
const ShippingAddress = require("./ShippingAddress");
const Review = require("./Review");
const Wishlist = require("./Wishlist");
const Coupon = require("./Coupon");
const Notification = require("./Notification");

/* ==========================
   CATEGORY ↔ PRODUCT
========================== */
Category.hasMany(Product, { foreignKey: "categoryId", onDelete: "CASCADE", onUpdate: "CASCADE" });
Product.belongsTo(Category, { foreignKey: "categoryId", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   BRAND ↔ PRODUCT
========================== */
Brand.hasMany(Product, { foreignKey: "brandId", onDelete: "CASCADE", onUpdate: "CASCADE" });
Product.belongsTo(Brand, { foreignKey: "brandId", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   USER ↔ CART
========================== */
User.hasOne(Cart, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });
Cart.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   CART ↔ CARTITEM
========================== */
Cart.hasMany(CartItem, { foreignKey: "cartId", onDelete: "CASCADE", onUpdate: "CASCADE" });
CartItem.belongsTo(Cart, { foreignKey: "cartId", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   PRODUCT ↔ CARTITEM
========================== */
Product.hasMany(CartItem, { foreignKey: "productId", onDelete: "CASCADE", onUpdate: "CASCADE" });
CartItem.belongsTo(Product, { foreignKey: "productId", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   USER ↔ ORDER
========================== */
User.hasMany(Order, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });
Order.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   ORDER ↔ ORDERITEM
========================== */
Order.hasMany(OrderItem, { foreignKey: "orderId", onDelete: "CASCADE", onUpdate: "CASCADE" });
OrderItem.belongsTo(Order, { foreignKey: "orderId", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   PRODUCT ↔ ORDERITEM
========================== */
Product.hasMany(OrderItem, { foreignKey: "productId", onDelete: "CASCADE", onUpdate: "CASCADE" });
OrderItem.belongsTo(Product, { foreignKey: "productId", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   ORDER ↔ PAYMENT
========================== */
Order.hasOne(Payment, { foreignKey: "orderId", onDelete: "CASCADE", onUpdate: "CASCADE" });
Payment.belongsTo(Order, { foreignKey: "orderId", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   USER ↔ SHIPPINGADDRESS
========================== */
User.hasMany(ShippingAddress, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });
ShippingAddress.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   ORDER ↔ SHIPPINGADDRESS
========================== */
Order.belongsTo(ShippingAddress, { foreignKey: "shippingAddressId", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   USER ↔ REVIEW
========================== */
User.hasMany(Review, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });
Review.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   PRODUCT ↔ REVIEW
========================== */
Product.hasMany(Review, { foreignKey: "productId", onDelete: "CASCADE", onUpdate: "CASCADE" });
Review.belongsTo(Product, { foreignKey: "productId", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   USER ↔ WISHLIST
========================== */
User.hasMany(Wishlist, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });
Wishlist.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   PRODUCT ↔ WISHLIST
========================== */
Product.hasMany(Wishlist, { foreignKey: "productId", onDelete: "CASCADE", onUpdate: "CASCADE" });
Wishlist.belongsTo(Product, { foreignKey: "productId", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================
   COUPON ↔ ORDER
========================== */
Coupon.hasMany(Order, { foreignKey: "couponId", onDelete: "SET NULL", onUpdate: "CASCADE" });
Order.belongsTo(Coupon, { foreignKey: "couponId", onDelete: "SET NULL", onUpdate: "CASCADE" });

/* ==========================
   USER ↔ NOTIFICATION
========================== */
User.hasMany(Notification, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });
Notification.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });

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
  Coupon,
  Notification
};
