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
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    discount: { 
        type: DataTypes.DECIMAL(5, 2), 
        defaultValue: 0.0 
    },
    stock: { 
        type: DataTypes.INTEGER, 
        defaultValue: 0 
    },
    images: { 
        type: DataTypes.JSON,
        allowNull:false
    },
  }
);

module.exports = Product;
