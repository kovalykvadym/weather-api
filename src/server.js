const app = require("./app");
const redis = require("./integrations/redis.client");
const env = require("./config/env");

const PORT = env.port;

async function startServer() {
	try {
		app.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}`);
		});

		await redis.connectRedis();
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

startServer();
