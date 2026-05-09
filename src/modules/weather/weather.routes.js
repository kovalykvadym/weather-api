const express = require("express");
const weatherController = require("./weather.controller");
const asyncWrapper = require("../../middleware/async-handler");
const router = express.Router();

router.get("/", asyncWrapper(weatherController));

module.exports = router;
