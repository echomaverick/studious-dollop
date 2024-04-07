const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.TOKEN_KEY, {
    expiresIn: "15m",
  });

  return token;
};

const refreshToken = (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token is required" });
    }

    const decoded = jwt.verify(refreshToken, process.env.TOKEN_KEY);

    const newAccessToken = generateAccessToken(decoded.userId);

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Refresh token has expired" });
    }
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};

module.exports = refreshToken;
