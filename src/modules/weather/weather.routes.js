const express = require("express");
const weatherController = require("./weather.controller");
const router = express.Router();

router.get("/", weatherController);

module.exports = router;
