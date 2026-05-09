const express = require("express");
const weatherController = require("./weather.controller");
const asyncWrapper = require("../../middleware/async-handler");
const router = express.Router();
const validate = require("../../middleware/validate.middleware");
const { getWeatherSchema } = require("../../validation/weather.validation");

router.get("/", validate(getWeatherSchema), asyncWrapper(weatherController));

module.exports = router;
