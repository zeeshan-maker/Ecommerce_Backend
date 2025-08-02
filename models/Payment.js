const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Payment = sequelize.define("Payment", {
  payment_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  paymentMethod: {
    type: DataTypes.ENUM("stripe", "paypal", "cod"),
    allowNull: false,
  },
  transactionId: {
    type: DataTypes.STRING,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "completed", "failed"),
    defaultValue: "pending",
  },
});

module.exports = Payment;
