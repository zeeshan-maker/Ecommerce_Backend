const { Sequelize } = require("sequelize");
require("dotenv").config();


const sequelize = new Sequelize(process.env.DATABASE_URL,
  {
    dialect: process.env.DB_dialect, 
     dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Important for Render SSL
      },
    }
  }

);


module.exports = sequelize