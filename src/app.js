const express = require("express");
const app = express();
const weatherRoutes = require("./modules/weather/weather.routes");
const errorMiddleware = require("./middleware/error.middleware");

app.use(express.json());

app.use("/weather", weatherRoutes);

app.use(errorMiddleware);

module.exports = app;
