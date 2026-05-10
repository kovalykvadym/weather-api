const { getRedisStatus } = require("../../integrations/redis.client");

function getHealth() {
	const redisStatus = getRedisStatus();
	const uptime = process.uptime();
	const timestamp = new Date().toISOString();

	return {
		success: true,
		data: {
			status: "ok",
			redis: redisStatus ? "connected" : "disconnected",
			uptime,
			timestamp,
		},
	};
}

module.exports = getHealth;
