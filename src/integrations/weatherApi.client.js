const axios = require("axios");
const AppError = require("../errors/app-error");
const env = require("../config/env");

async function getWeatherByCity(city) {
	const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?key=${env.weatherApiKey}&unitGroup=metric&lang=uk`;
	try {
		const response = await axios.get(url);
		const data = response.data;

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
				throw AppError("city_not_found", "City not found", 404);
			}

			if (status >= 500) {
				throw AppError("external_api_error", "External API error", 502);
			}
		}

		if (error.request) {
			throw AppError("external_api_error", "External API error", 502);
		}

		throw AppError("internal_error", "Internal error", 500);
	}
}

module.exports = getWeatherByCity;
