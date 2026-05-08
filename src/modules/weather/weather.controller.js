const getWeather = require("./weather.service");

async function weatherController(req, res, next) {
	const city = req.query.city;

	try {
		const payload = await getWeather(city);
		return res.status(200).json(payload);
	} catch (error) {
		next(error);
	}
}

module.exports = weatherController;
