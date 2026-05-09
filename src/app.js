const express = require("express");
const app = express();
const rateLimitMiddleware = require("./middleware/rate-limit.middleware");
const requestLogger = require("./middleware/request-logger.middleware");
const weatherRoutes = require("./modules/weather/weather.routes");
const errorMiddleware = require("./middleware/error-handler.middleware");

app.use(express.json());
app.use(requestLogger);
app.use(rateLimitMiddleware);

app.use("/weather", weatherRoutes);

app.use(errorMiddleware);

module.exports = app;
