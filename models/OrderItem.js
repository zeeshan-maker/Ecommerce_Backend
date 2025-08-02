const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const OrderItem = sequelize.define("OrderItem", {
  orderItem_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = OrderItem;
