const express = require("express");
const weatherController = require("./weather.controller");
const validateCityMiddleware = require("../../middleware/validate-city.middleware");
const router = express.Router();

router.get("/", validateCityMiddleware, weatherController);

module.exports = router;
