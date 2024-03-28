const User = require("../../models/userModel");

const getUserByEmail = async (req, res) => {
  try {
    const userEmail = req.params.email;
    
    if (!userEmail) {
      return res.status(400).json({ message: "User email is required." });
    }
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error getting user by email:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getUserByEmail;
