const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Payment = sequelize.define("Payment", {
  payment_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  paymentMethod: {
    type: DataTypes.ENUM("stripe", "razorpay", "cod"),
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
   paymentStatus: {
       type: DataTypes.ENUM("pending", "paid", "failed"), 
       defaultValue: "pending" 
      },

});

module.exports = Payment;
