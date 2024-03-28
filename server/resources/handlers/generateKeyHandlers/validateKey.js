const speakeasy = require("speakeasy");
const User = require("../../models/userModel");

const validateCode = async (req, res) => {
  try {
    const { code, userEmail } = req.body;

    if (!code) {
      return res.status(400).json({ message: "Code is required." });
    }

    if (!userEmail) {
      return res.status(400).json({ message: "User email is required." });
    }

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!user.secretKey) {
      return res.status(404).json({ message: "User secret key not found." });
    }

    const isValidCode = speakeasy.totp.verify({
      secret: user.secretKey,
      encoding: "base32",
      token: code,
      window: 1,
    });

    if (isValidCode) {
      user.codeConfirmed = true;
      await user.save();
      return res.status(200).json({ message: "Code is valid." });
    } else {
      return res.status(401).json({ message: "Code is invalid." });
    }
  } catch (error) {
    console.error("Error validating code:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = validateCode;
