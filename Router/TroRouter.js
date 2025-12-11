const express = require("express");
const router = express.Router();
const troController = require("../controller/createTroController.js");

router.post("/tro/create", troController.createTro);

module.exports = router;
