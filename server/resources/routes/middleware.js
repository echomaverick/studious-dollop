const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../handlers/middleware/middleware");

router.get("/protected-route", authenticateToken, (req, res) => {
  res.json({ message: "Access granted - You are authenticated" });
});

module.exports = router;
