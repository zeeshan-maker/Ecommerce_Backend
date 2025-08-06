const { DataTypes } = require("sequelize");
const sequelize  = require("../config/db");

const User = sequelize.define("User",{
    user_id:{
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false, 
    },
    phone:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    profileImage: { 
        type: DataTypes.STRING
     },
    role:{
        type:DataTypes.ENUM("customer","admin","seller"),
        defaultValue: "customer"
    },
    isVerify:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
    
},
{
    tableName:"User"
});


module.exports = User;