const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");
require("dotenv").config();

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, {
      expiresIn: "2m",
    });

    console.log("Authentication token generated: ", token);

    return res.status(200).json({ message: "User logged in successfully", token });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = loginUser;
