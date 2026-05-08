const axios = require("axios");

async function getWeatherByCity(city) {
	const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?key=${process.env.WEATHER_API_KEY}&unitGroup=metric&lang=uk`;
	try {
		const response = await axios.get(url);

		const data = await response.data;

		return {
			location: data.resolvedAddress,
			timezone: data.timezone,
			current_weather: {
				temperature: data.currentConditions.temp,
				feels_like: data.currentConditions.feelslike,
				condition: data.currentConditions.condition,
				humidity: data.currentConditions.humidity,
				wind_speed: data.currentConditions.windspeed,
				icon: data.currentConditions.icon,
			},
			today_forecast: {
				temp_max: data.days[0].tempmax,
				temp_min: data.days[0].tempmin,
				sunrise: data.days[0].sunrise,
				sunset: data.days[0].sunset,
				description: data.days[0].description,
			},
		};
	} catch (error) {
		if (error.response) {
			const status = error.response.status;

			if (status >= 400 && status < 500) {
				throw { type: "city_not_found" };
			}

			if (status >= 500) {
				throw { type: "external_api_error" };
			}
		}

		if (error.request) {
			throw { type: "external_api_error" };
		}

		throw { type: "internal_error" };
	}
}

module.exports = getWeatherByCity;
