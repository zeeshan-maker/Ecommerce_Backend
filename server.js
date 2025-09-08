const express= require("express");
require('dotenv').config();
const cors = require("cors");
const sequelize = require("./config/db")

const app = express();
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/api/v1/auth",require("./routes/authRoutes"));
app.use("/api/v1/category",require("./routes/categoryRoutes"));
app.use("/api/v1/product",require("./routes/productRoutes"));
app.use("/api/v1/payments",require("./routes/paymentRoutes"));

app.get("/",(req, res)=>{
     return res.json({message:"Welcome To E-Commerce Application."})
});

// Database Connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB Connected");
    await sequelize.sync({ alter: true }); // use { force: true } to reset tables

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ DB Connection failed:", error);
  }
})();

