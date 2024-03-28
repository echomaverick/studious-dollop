const express = require("express");
const generateKey = require("../handlers/generateKeyHandlers/generateKey");
const validateKey = require("../handlers/generateKeyHandlers/validateKey");

const router = express.Router();

router.put("/generate-key", generateKey);
router.post("/validate-code", validateKey);

module.exports = router;
