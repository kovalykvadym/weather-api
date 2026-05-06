const getWeatherByCity = require("../../integrations/weatherApi.client");

async function getWeather(city) {
	return getWeatherByCity(city);
}

module.exports = getWeather;
