const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const tokenFromBody = req.body.token; 

  console.log("Body token: ", tokenFromBody);
  
  if (!tokenFromBody) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(tokenFromBody, process.env.TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const clearAuthentication = async (req, res, next) => {
  console.log("User logged out due to token expiration or invalidity");
  next();
  return res
    .status(401)
    .json({ message: "Unauthorized - Token expired or invalid" });
};

module.exports = { authenticateToken, clearAuthentication };
