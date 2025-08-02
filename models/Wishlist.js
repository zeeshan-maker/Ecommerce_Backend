const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Wishlist = sequelize.define("Wishlist", {
  wishlist_id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4,
     primaryKey: true 
    },
     user_id: { 
    type: DataTypes.UUID, 
    allowNull: false 
  },
  product_id: { 
    type: DataTypes.UUID, 
    allowNull: false 
  }
});

module.exports = Wishlist;
