const { User } = require("../models/index.js");
const generateToken = require("../utils/generateToken");
const { Op } = require("sequelize");
const { sendEmail } = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const existingUser = await User.findOne({
      where: { [Op.or]: [{ email }, { phone }] },
    });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({
          status: 400,
          message: "Email already registered.",
        });
      }

      if (existingUser.phone === phone) {
        return res
          .status(409)
          .json({ status: 409, message: "Phone Number already registered." });
      }
    }

    // create new user
    const newUser = await User.create({
      name,
      email,
      phone,
      password,
    });

    res
      .status(200)
      .json({
        status: 200,
        message: "Registration successful, please verify your email!",
      });

    // Create verification token
    const token = jwt.sign(
      { user_id: newUser.user_id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const verifyLink = `${process.env.SERVER_URL}/api/v1/auth/verify-user/${token}`;
    await sendEmail(
      email,
      "Use This Link to Activate Your Account",
      `Please verify your account.`,
      `<p>Click to verify: <a href="${verifyLink}">${verifyLink}</a></p>`
    );
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Server Error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      if (!user) return res.status(400).json({ message: "User not found" });
    }
    const isMatch = password === user.password;
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid credentials" });
    }

    if (!user.isVerify) {
      // Create verification token
      const token = jwt.sign(
        { user_id: user.user_id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      const verifyLink = `${process.env.SERVER_URL}/api/v1/auth/verify-user/${token}`;
      await sendEmail(
        email,
        "Use This Link to Activate Your Account",
        `Please verify your account.`,
        `<p>Click to verify: <a href="${verifyLink}">${verifyLink}</a></p>`
      );
      return res.status(400).json({
        status: 400,
        message: "Please Check your email to verify your account.",
      });
    }

    return res.status(200).json({
      status:200,
      message: "Login successful",
      token: generateToken(user.user_id),
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Server error" });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const { token } = req.params;
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Update use
    const user = await User.findByPk(decoded.user_id);
    if (!user)
      return res.status(404).json({ status: 404, message: "User not found" });

    user.isVerify = true;
    await user.save();
    return res
      .status(200)
      .json({ status: 200, message: "Account verified successfully!" });
  } catch (error) {
    res.status(400).json({ status: 400, message: "Invalid or expired token" });
  }
};

exports.updateProfileImage = async (req, res)=>{
  try {
       const user_id = req.user.user_id;
       res.status(200).json({ status: 200, message:"Profile image updated!" });
  } catch (error) {
    return res.status(500).json({ status: 500, error: error.message});
  }
}


exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) return res.status(404).json({ status:404, message: "User not found" });

    const token = generateToken(user.user_id)
    res.status(200).json({ status: 200, message: "Reset link sent to email" });
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
    await sendEmail(
      email,
      "Reset Your Password",
      `We received a request to reset your password. Click the button below to set a new password`,
      `<p style="text-align: center;">
                 <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px;">Reset Password</a>

            </p>
            <p style="text-align: center; margin-top: 20px;">Or copy this link: <br/> <a href="${resetLink}">${resetLink}</a></p>`
    );

  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};


exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.user_id);
    if (!user)
    return res.status(400).json({ message: "Invalid or expired token" });
    user.password = newPassword;
    await user.save();
    return res
      .status(200)
      .json({ status: 200, message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ status: 500, error: error.message });
  }
};
