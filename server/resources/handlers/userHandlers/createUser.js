const bcrypt = require("bcrypt");
const User = require("../../models/userModel");

const createUser = async (req, res) => {
  try {
    const { name, surname, email, age, password } = req.body;

    console.log("Request body:", req.body);

    if (!name || !surname || !email || !age || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (name.length < 3 || surname.length < 3) {
      return res.status(400).json({
        message: "Name and surname must be at least 3 characters long.",
      });
    }

    if (email.length > 255) {
      return res.status(400).json({ message: "Invalid email length." });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long.",
      });
    }

    const parsedAge = parseInt(age, 10);
    if (isNaN(parsedAge) || parsedAge < 13) {
      return res.status(400).json({
        message:
          "Age must be a number and the user must be at least 13 years old.",
      });
    }

    console.log("After validation checks. Creating user...");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      surname,
      email,
      age: parsedAge,
      password: hashedPassword,
    });

    await newUser.save();

    console.log("User created successfully.");

    return res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = createUser;
