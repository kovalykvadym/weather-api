const { createClient } = require("redis");
const logger = require("../utils/logger");
const env = require("../config/env");

const redisClient = createClient({
	url: env.redisUrl,
	socket: {
		reconnectStrategy: (retries) => Math.min(retries * 100, 3000),
	},
});

redisClient.on("error", (err) => {
	logger.error("Redis error:", err.message);
});

redisClient.on("connect", () => {
	logger.info("Redis connecting...");
});

redisClient.on("ready", () => {
	logger.info("Redis ready");
});

async function connectRedis() {
	try {
		if (!redisClient.isOpen) {
			await redisClient.connect();
		}
	} catch (err) {
		logger.error("Redis connection failed:", err.message);
	}
}

async function getCache(key) {
	try {
		if (!redisClient.isReady) return null;

		const normalizedKey = key.trim().toLowerCase();
		return await redisClient.get(normalizedKey);
	} catch (err) {
		logger.error("Redis GET error:", err.message);
		return null;
	}
}

async function setCache(key, value, ttl = 3600) {
	try {
		if (!redisClient.isReady) return;

		const normalizedKey = key.trim().toLowerCase();

		await redisClient.set(normalizedKey, value, {
			EX: ttl,
		});
	} catch (err) {
		logger.error("Redis SET error:", err.message);
	}
}

module.exports = {
	connectRedis,
	getCache,
	setCache,
};
