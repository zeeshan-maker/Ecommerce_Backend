const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Coupon = sequelize.define("Coupon", {
  coupon_id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true 
},
  code: { 
    type: DataTypes.STRING, 
    unique: true 
},
  discountType: { 
    type: DataTypes.ENUM("percentage", "fixed"), 
    allowNull: false 
},
  discountValue: { 
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false 
},
  startDate: { 
    type: DataTypes.DATE, 
    allowNull: false 
},
  endDate: { 
    type: DataTypes.DATE, 
    allowNull: false 
},
  usageLimit: {
     type: DataTypes.INTEGER 
    }
});

module.exports = Coupon;
