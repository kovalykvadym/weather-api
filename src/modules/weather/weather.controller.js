const getWeather = require("./weather.service");
const AppError = require("../../errors/app-error");

async function weatherController(req, res) {
	const city = req.query.city;

	if (!city) {
		throw AppError("validation_error", "City is required", 400);
	}

	const payload = await getWeather(city);

	return res.status(200).json(payload);
}

module.exports = weatherController;
