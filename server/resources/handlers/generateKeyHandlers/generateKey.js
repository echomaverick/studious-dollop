const speakeasy = require("speakeasy");
const User = require("../../models/userModel");

const generateSecretKey = async (req, res) => {
  try {
    const { userEmail } = req.body;

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const secret = speakeasy.generateSecret({ length: 20 });
    const secretKey = secret.base32;
    console.log("Generated secret key:", secretKey);

    user.secretKey = secretKey;
    await user.save();

    res
      .status(201)
      .json({ message: "Secret key generated successfully", secretKey });
  } catch (error) {
    console.error("Error generating secret key:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = generateSecretKey;
