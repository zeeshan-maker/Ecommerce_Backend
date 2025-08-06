const express= require("express");
require('dotenv').config();
const cors = require("cors");
const sequelize = require("./config/db")

const app = express();
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/v1/auth",require("./routes/authRoutes"))

app.get("/",(req, res)=>{
     return res.json({message:"Welcome To E-Commerce Application."})
});

// Database Connection
sequelize.sync({ alter: true })
  .then(() => console.log("✅ Database synced"))
  .catch((err) => console.error("❌ Database connection failed:", err));


sequelize.sync({force:false}).then(()=>{
    app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})
})