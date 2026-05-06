const getWeather = require("./weather.service");

function weatherController(req, res) {
	const city = req.query.city;
	const payload = getWeather(city);
	return res.status(200).json(payload);
}

module.exports = weatherController;
