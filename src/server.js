const dotenv = require("dotenv");
const app = require("./app");

dotenv.config();

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
