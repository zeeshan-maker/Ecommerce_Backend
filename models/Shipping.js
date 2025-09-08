const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ShippingAddress = sequelize.define("ShippingAddress", {
  shippingAddress_id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true 
},
 order_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  
address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
     type: DataTypes.STRING, 
     allowNull: false
     },
  state: { 
    type: DataTypes.STRING, 
    allowNull: false 
},
  postalCode: { 
    type: DataTypes.STRING, 
    allowNull: false 
},
  country: { 
    type: DataTypes.STRING,
     allowNull: false 
    },
  phone: { 
    type: DataTypes.STRING,
    allowNull:false,
}
});

module.exports = ShippingAddress;
