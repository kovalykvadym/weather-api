const joi = require("joi");

const getWeatherSchema = joi.object({
	city: joi.string().trim().min(2).max(100).required(),
});

module.exports = {
	getWeatherSchema,
};
