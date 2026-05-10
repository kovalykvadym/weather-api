function formatSuccessResponse(data, requestId, cached = false) {
	const timestamp = new Date().toISOString();

	return {
		success: true,
		meta: {
			requestId,
			cached,
			timestamp,
		},
		data,
	};
}

module.exports = formatSuccessResponse;
