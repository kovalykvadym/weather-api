const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Weather API",
			version: "1.0.0",
			description: "API documentation",
		},
		servers: [
			{
				url: "http://localhost:3000",
			},
		],
	},
	apis: ["./src/modules/weather/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
