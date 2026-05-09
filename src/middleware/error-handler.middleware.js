const logger = require("../utils/logger");

function errorHandler(error, req, res, next) {
	const status = error.statusCode || 500;

	logger.error("Request failed", {
		type: error.type,
		message: error.message,
		path: req.originalUrl,
		method: req.method,
	});

	return res.status(status).json({
		error: {
			type: error.type || "unknown_error",
			message: error.message || "Unknown error",
		},
	});
}

module.exports = errorHandler;
