const joi = require("joi");
require("dotenv").config();

const schema = joi.object({
	NODE_ENV: joi
		.string()
		.valid("development", "production", "test")
		.default("development"),
	PORT: joi.number().default(3000),
	WEATHER_API_KEY: joi.string().required(),
	REDIS_URL: joi.string().uri().default("redis://localhost:6379"),
});

const { value, error } = schema.validate(process.env);

if (error) {
	throw new Error(`Environment validation error: ${error.message}`);
}

const env = {
	nodeEnv: value.NODE_ENV,
	port: value.PORT,
	weatherApiKey: value.WEATHER_API_KEY,
	redisUrl: value.REDIS_URL,
};

module.exports = env;
