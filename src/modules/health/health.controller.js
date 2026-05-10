const getHealth = require("./health.service");

function healthController(req, res) {
	const health = getHealth();

	return res.status(200).json(health);
}

module.exports = healthController;
