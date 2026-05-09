const request = require("supertest");
const app = require("../../src/app");

describe("GET /weather", () => {
	test("should return 400 when city is missing", async () => {
		const response = await request(app).get("/weather");

		expect(response.statusCode).toBe(400);
	});

	test("should return weather data for valid city", async () => {
		const response = await request(app).get("/weather?city=Kyiv");

		expect(response.statusCode).toBe(200);
	});

	test("should return 404 for invalid city", async () => {
		const response = await request(app).get("/weather?city=INVALID_CITY_TEST");

		expect(response.statusCode).toBe(404);
	});
});
