const User = require("../../models/userModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error getting all users:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getAllUsers;
