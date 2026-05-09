function info(message, meta = {}) {
	console.log(
		JSON.stringify({
			level: "INFO",
			message: message,
			...meta,
			timestamp: new Date().toISOString(),
		}),
	);
}

function warn(message, meta = {}) {
	console.log(
		JSON.stringify({
			level: "WARN",
			message: message,
			...meta,
			timestamp: new Date().toISOString(),
		}),
	);
}

function error(message, meta = {}) {
	console.log(
		JSON.stringify({
			level: "ERROR",
			message: message,
			...meta,
			timestamp: new Date().toISOString(),
		}),
	);
}

module.exports = {
	info,
	warn,
	error,
};
