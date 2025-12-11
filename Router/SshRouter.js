const express = require("express");
const router = express.Router();
const sshController = require("../controller/createSshController.js");

router.post("/ssh/create", sshController.createSsh);

module.exports = router;
