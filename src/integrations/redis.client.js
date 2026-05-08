const { createClient } = require("redis");

const redisClient = createClient({
	url: process.env.REDIS_URL || "redis://localhost:6379",
	socket: {
		reconnectStrategy: (retries) => {
			return Math.min(retries * 100, 3000);
		},
	},
});

redisClient.on("error", (err) => {
	console.log("Redis error:", err.message);
});

async function connectRedis() {
	try {
		if (!redisClient.isOpen) {
			await redisClient.connect();
			console.log("Redis connected");
		}
	} catch (err) {
		console.log("Redis initial connection failed");
	}
}

async function get(key) {
	try {
		if (!redisClient.isReady) return null;

		return await redisClient.get(key);
	} catch {
		return null;
	}
}

async function set(key, value, ttl = 3600) {
	try {
		if (!redisClient.isReady) return;

		await redisClient.set(key, value, {
			EX: ttl,
		});
	} catch {}
}

module.exports = {
	get,
	set,
	connectRedis,
};
