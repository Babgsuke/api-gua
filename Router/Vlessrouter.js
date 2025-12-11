const express = require("express");
const router = express.Router();
const vlessController = require("../controller/createVlessController.js");

router.post("/vless/create", vlessController.createVless);

module.exports = router;
