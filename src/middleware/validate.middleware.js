const AppError = require("../errors/app-error");

function validate(schema, property = "query") {
	return (req, res, next) => {
		const { error } = schema.validate(req[property]);

		if (error) {
			return next(AppError("validation_error", error.details[0].message, 400));
		}

		next();
	};
}

module.exports = validate;
