const express = require("express");
const app = express();
const rateLimitMiddleware = require("./middleware/rate-limit.middleware");
const requestLogger = require("./middleware/request-logger.middleware");
const weatherRoutes = require("./modules/weather/weather.routes");
const errorMiddleware = require("./middleware/error-handler.middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./docs/swagger");

app.use(express.json());
app.use(requestLogger);
app.use(rateLimitMiddleware);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/weather", weatherRoutes);

app.use(errorMiddleware);

module.exports = app;
