const getWeather = require("./weather.service");

async function weatherController(req, res) {
	const city = req.query.city;
	const payload = await getWeather(city);
	return res.status(200).json(payload);
}

module.exports = weatherController;
