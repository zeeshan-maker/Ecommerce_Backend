const sequelize = require("../config/db");

// Import all models
const User = require("./User");
const Category = require("./Category");
const Product = require("./Product");
const Order = require("./Order");
const OrderItem = require("./OrderItem");
const Payment = require("./Payment");
const ShippingAddress = require("./Shipping");

/* ==========================
   CATEGORY ↔ PRODUCT
========================== */
Category.hasMany(Product, { foreignKey: "category_id", onDelete: "CASCADE", onUpdate: "CASCADE" });
Product.belongsTo(Category, { foreignKey: "category_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

/* ==========================



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



module.exports = {
  sequelize,
  User,
  Category,
  Product,
  Order,
  OrderItem,
  Payment,
  ShippingAddress,
  
};
