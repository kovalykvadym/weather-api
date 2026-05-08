const getWeatherByCity = require("../../integrations/weatherApi.client");
const { get, set } = require("../../integrations/redis.client");

async function getWeather(city) {
	const key = `weather:${city.trim().toLowerCase()}`;

	let cached = null;
	try {
		cached = await get(key);
	} catch (error) {
		console.warn(error);
	}

	if (cached !== null) {
		return JSON.parse(cached);
	}

	const data = await getWeatherByCity(city);

	try {
		await set(key, JSON.stringify(data), 60);
	} catch (error) {
		console.warn(error);
	}

	return data;
}

module.exports = getWeather;
