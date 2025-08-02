const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Notification = sequelize.define("Notification", {
  notification_id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true 
},
  title: { 
    type: DataTypes.STRING, 
    allowNull: false 
},
  message: {
     type: DataTypes.TEXT 
    },
  status: {
     type: DataTypes.ENUM("unread", "read"),
      defaultValue: "unread" 
    }
});

module.exports = Notification;
