const getHealth = require("./health.service");

function healthController(_req, res) {
	const health = getHealth();

	return res.status(200).json(health);
}

module.exports = healthController;
