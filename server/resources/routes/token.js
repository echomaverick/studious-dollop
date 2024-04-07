const express = require('express');
const router  = express.Router();
const refreshToken = require('../handlers/token/refreshToken');

router.post("/refresh-token", refreshToken);

module.exports = router;