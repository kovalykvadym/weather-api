const logger = require("../utils/logger");

function requestLogger(req, res, next) {
	logger.info("Incoming message", {
		id: req.id,
		method: req.method,
		path: req.originalUrl,
		ip: req.ip,
	});

	next();
}

module.exports = requestLogger;
