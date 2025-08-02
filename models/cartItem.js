const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const CartItem = sequelize.define("CartItem", {
  cartItem_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = CartItem;
