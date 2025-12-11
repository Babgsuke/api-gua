const express = require("express");
const router = express.Router();
const vmessController = require("../controller/createVmeController.js");

router.post("/vmess/create", vmessController.createVmess);

module.exports = router;
