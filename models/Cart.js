const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Cart = sequelize.define("Cart", {
  cart_id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4,
     primaryKey: true 
    }
});

module.exports = Cart;
