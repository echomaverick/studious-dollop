const express = require("express");
const createUser = require("../handlers/userHandlers/createUser");
const getAllUsers = require("../handlers/userHandlers/getAllUsers");
const loginUser = require("../handlers/userHandlers/userLogin");
const getUserByEmail = require("../handlers/userHandlers/getUserByEmail");
const updateUser = require("../handlers/userHandlers/updateUser");
const rateLimit = require("express-rate-limit");

const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});

router.use(limiter);

router.post("/create-user", createUser);
router.get("/user/:email", getUserByEmail);
router.get("/users", getAllUsers);
router.post("/login", loginUser);
router.put("/update-user/:email", updateUser);

module.exports = router;
