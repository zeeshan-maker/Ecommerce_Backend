const { User } = require("../models/Index");
const generateToken = require("../utils/generateToken")

exports.register = async (req, res) => {
  const { name, email,phone, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ status:400, message: "Email already registered." });
    }

     const existingPhone = await User.findOne({ where: { phone } });
    if (existingPhone) {
      return res.status(400).json({ status:400, message: "Phone Number already registered." });
    }


    // create new user
    const newUser = await User.create({
      name,
      email,
      phone,
      password,
    });


    return res.status(200).json({
      message: "User registered successfully",
      user: {
        user_id: newUser.user_id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role
      },
    });

  } catch (error) {
    return res.status(500).json({ status:500, message: "Server Error"});
  }
};


exports.login = async (req, res) =>{
  const { email, password } = req.body

  try {
    const user = await User.findOne({where:{email}})

    if(!user){
         if (!user) return res.status(400).json({ message: "User not found" });
    }
     const isMatch = password === user.password
     if(!isMatch){
      return res.status(400).json({status:400, message:"Invalid credentials"})
     }
    return res.json({
      message: "Login successful",
      token: generateToken(user.user_id),
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
      return res.status(500).json({status:500, message: "Server error" });
  }
}
