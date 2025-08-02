const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Brand = sequelize.define("Brand", {
  brand_id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true 
},
  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
},
  logo: { 
    type: DataTypes.STRING 
}
});

module.exports = Brand;
