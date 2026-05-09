const getWeatherByCity = require("../../integrations/weatherApi.client");
const { getCache, setCache } = require("../../integrations/redis.client");
const logger = require("../../utils/logger");

async function getWeather(city) {
	const normalizedCity = city.trim().toLowerCase();
	const key = `weather:${normalizedCity}`;

	const cached = await getCache(key);

	if (cached) {
		logger.info("Cache hit", { key });

		return JSON.parse(cached);
	}

	logger.info("Cache miss", { key });

	const data = await getWeatherByCity(normalizedCity);

	setCache(key, JSON.stringify(data), 60).catch((err) => {
		console.warn("Cache write failed:", err.message);
	});

	return data;
}

module.exports = getWeather;
