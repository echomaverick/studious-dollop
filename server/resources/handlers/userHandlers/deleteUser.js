const User = require("../../models/userModel");

const softDeleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const user = await User.findById(userId);

    if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.deleted = true;

    await user.save();

    return res.status(200).json({ message: "User soft deleted successfully." });
  } catch (error) {
    console.error("Error soft deleting user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = softDeleteUser;
