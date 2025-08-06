// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const { User } = require("../models/Index");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user =  await User.findByPk(decoded.user_id, {attributes: { exclude: ["password"] }});
     if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  


};


// middleware/adminMiddleware.js
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); 
  } else {
    res.status(403).json({status:403, message: "Access denied. Admins only." });
  }
};



module.exports = { verifyToken, isAdmin };
