const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ShippingAddress = sequelize.define("ShippingAddress", {
  shippingAddress_id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true 
},
  fullName: { 
    type: DataTypes.STRING, 
    allowNull: false 
},
  addressLine1: { 
    type: DataTypes.STRING, 
    allowNull: false 
},
  addressLine2: {
     type: DataTypes.STRING 
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
    type: DataTypes.STRING 
}
});

module.exports = ShippingAddress;
