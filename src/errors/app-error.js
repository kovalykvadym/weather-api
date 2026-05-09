function AppError(type, message, statusCode = 500) {
	return {
		type,
		message,
		statusCode,
	};
}

module.exports = AppError;
