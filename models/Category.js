const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Category = sequelize.define("Category",{
    category_id:{
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey: true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    
})

module.exports = Category;

