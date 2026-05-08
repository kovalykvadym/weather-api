function errorMiddleware(error, req, res, next) {
	switch (error.type) {
		case "city_not_found": {
			return res.status(404).json({ error: "City not found" });
		}
		case "external_api_error": {
			return res.status(502).json({ error: "External API error" });
		}
		case "internal_error": {
			return res.status(500).json({ error: "Internal server error" });
		}
		default:
			return res.status(500).json({ error: "Unknown error" });
	}
}

module.exports = errorMiddleware;
