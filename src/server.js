const app = require("./app");
const env = require("./config/env");
const logger = require("./utils/logger");
const {
	connectRedis,
	disconnectRedis,
} = require("./integrations/redis.client");

const PORT = env.port;
let server = null;

async function startServer() {
	try {
		server = app.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}`);
		});

		await connectRedis();
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

function shutdownLogic(signal) {
	logger.info(`Received ${signal}, starting graceful shutdown...`);

	server.close(async () => {
		await disconnectRedis();
		process.exit(0);
	});

	setTimeout(() => {
		logger.error(
			"Could not close connections in time, forcefully shutting down",
		);
		process.exit(1);
	}, 10000);
}

process.on("SIGTERM", () => shutdownLogic("SIGTERM"));
process.on("SIGINT", () => shutdownLogic("SIGINT"));

startServer();
