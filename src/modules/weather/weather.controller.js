const getWeather = require("./weather.service");
const formatSuccessResponse = require("../../utils/response-formatter");

async function weatherController(req, res) {
	const city = req.query.city;

	const result = await getWeather(city);

	const data = result.data;
	const id = req.id;
	const cached = result.cached;

	const payload = formatSuccessResponse(data, id, cached);

	return res.status(200).json(payload);
}

module.exports = weatherController;
