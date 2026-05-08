const dotenv = require("dotenv");
const app = require("./app");
const redis = require("./integrations/redis.client");

dotenv.config();

const PORT = process.env.PORT;

async function startServer() {
	try {
		if (!PORT) {
			throw new Error("The port is not specified in the .env file");
		}

		await redis.connectRedis();

		app.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}`);
		});
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

startServer();
