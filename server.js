const express= require("express");
require('dotenv').config();
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors());
app.use(express.json());


// Routes


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})