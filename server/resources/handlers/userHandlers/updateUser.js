const bcrypt = require("bcrypt");
const User = require("../../models/userModel");

const updateUser = async (req, res) => {
  try {
    const { email, newPassword, linkedin, instagram, facebook } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!newPassword && !linkedin && !instagram && !facebook) {
      return res.status(400).json({ message: "Nothing to update." });
    }

    if (newPassword) {
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
      if (!passwordRegex.test(newPassword)) {
        return res.status(400).json({
          message:
            "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
        });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.findOneAndUpdate(
        { email: email },
        { password: hashedPassword }
      );
    }

    await User.findOneAndUpdate(
      { email: email },
      { linkedin, instagram, facebook }
    );

    console.log("User updated successfully.");
    return res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = updateUser;
