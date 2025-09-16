const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,   // database name
  process.env.DB_USER,   // username
  process.env.DB_PASS,   // password
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false, // disable SQL logs in console
  }
);

// const sequelize = new Sequelize(process.env.DATABASE_URL,
//   {
//     dialect: process.env.DB_dialect, 
//      dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false, // Important for Render SSL
//       },
//     }
//   }

// );


module.exports = sequelize