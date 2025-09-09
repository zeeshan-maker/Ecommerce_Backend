const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define(
  "Product",
  {
    product_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    old_price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    sizes:{
      type:DataTypes.JSONB,
      allowNull:false
    },
    stock: { 
        type: DataTypes.INTEGER, 
        defaultValue: 0 
    },
    images: { 
        type: DataTypes.JSONB,
        allowNull:false
    },
    bestseller:{
      type: DataTypes.BOOLEAN,
      defaultValue:false
    }
  }
);

module.exports = Product;
