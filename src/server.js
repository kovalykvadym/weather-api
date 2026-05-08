const dotenv = require("dotenv");
const app = require("./app");
const { connectRedis } = require("./integrations/redis.client");

dotenv.config();

const PORT = 3000;

async function startServer() {
	try {
		await connectRedis();

		app.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}`);
		});
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

startServer();
