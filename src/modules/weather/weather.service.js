const getWeatherByCity = require("../../integrations/weatherApi.client");
const { getRedisClient } = require("../../integrations/redis.client");

async function getWeather(city) {
	const key = `weather:${city}`;

	const redis = getRedisClient();
	const cached = await redis.get(key);

	if (cached !== null) {
		return JSON.parse(cached);
	}

	const data = await getWeatherByCity(city);
	await redis.set(key, JSON.stringify(data), 60);
	return data;
}

module.exports = getWeather;
