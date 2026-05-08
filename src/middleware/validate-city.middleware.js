function validateCityMiddleware(req, res, next) {
	const city = req.query.city;

	if (!city || typeof city !== "string") {
		return res.status(400).json({ error: "City is required" });
	}

	next();
}

module.exports = validateCityMiddleware;
