const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Review = sequelize.define("Review", {
  review_id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true 
},
  rating: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
},
  comment: { 
    type: DataTypes.TEXT 
}
});

module.exports = Review;
