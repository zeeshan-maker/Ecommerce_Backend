const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define("Order", {
  order_id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4,
     primaryKey: true 
    },
  totalAmount: { 
    type: DataTypes.DECIMAL(10, 2),
     allowNull: false 
    },
  paymentStatus: {
     type: DataTypes.ENUM("pending", "paid", "failed"), 
     defaultValue: "pending" },
  orderStatus: { 
    type: DataTypes.ENUM("pending", "processing", "shipped", "delivered", "cancelled"), 
    defaultValue: "pending" 
}
});

module.exports = Order;
