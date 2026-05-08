const redis = require("redis");
const redisClient = redis.createClient({
	url: "redis://localhost:6379",
});

redisClient.on("error", (error) => {
	console.error(`Redis Client Error: ${error}`);
});

async function connectRedis() {
	if (!redisClient.isOpen) {
		await redisClient.connect();
	}
}

function getRedisClient() {
	return {
		get: async (key) => {
			const normalizeKey = key.trim().toLowerCase();
			return redisClient.get(normalizeKey);
		},
		set: async (key, value, ttl = 43200) => {
			const normalizeKey = key.trim().toLowerCase();
			await redisClient.set(normalizeKey, value, {
				EX: ttl,
			});
		},
	};
}

module.exports = {
	connectRedis,
	getRedisClient,
};
