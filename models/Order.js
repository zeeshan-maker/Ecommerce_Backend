const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define("Order", {
  order_id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4,
     primaryKey: true 
    },
  
  totalAmount: { 
    type: DataTypes.FLOAT,
     allowNull: false 
    },
  orderStatus: { 
    type: DataTypes.ENUM("pending", "processing", "shipped", "delivered", "cancelled"), 
    defaultValue: "pending" 
}
});

module.exports = Order;
