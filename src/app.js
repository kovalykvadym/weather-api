const express = require("express");
const app = express();
const weatherRoutes = require("./modules/weather/weather.routes");

app.use(express.json());

app.use("/weather", weatherRoutes);

module.exports = app;
