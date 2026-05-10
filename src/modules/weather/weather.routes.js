const express = require("express");
const weatherController = require("./weather.controller");
const asyncWrapper = require("../../middleware/async-handler");
const validate = require("../../middleware/validate.middleware");
const { getWeatherSchema } = require("../../validation/weather.validation");

const router = express.Router();

/**
 * @swagger
 * /weather:
 *   get:
 *     summary: Get current weather by city name
 *     description: Returns current weather data and today forecast for a given city using external weather API with Redis caching.
 *     tags:
 *       - Weather
 *     parameters:
 *       - in: query
 *         name: city
 *         required: true
 *         description: Name of the city to fetch weather for
 *         schema:
 *           type: string
 *           example: Kyiv
 *     responses:
 *       200:
 *         description: Successfully retrieved weather data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 meta:
 *                   type: object
 *                   properties:
 *                     requestId:
 *                       type: string
 *                       format: uuid
 *                       example: 123e4567-e89b-12d3-a456-426614174000
 *                     cached:
 *                       type: boolean
 *                       example: false
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                       example: 2026-05-10T12:00:00.000Z
 *                 data:
 *                   type: object
 *                   properties:
 *                     location:
 *                       type: string
 *                       example: Kyiv, Ukraine
 *                     timezone:
 *                       type: string
 *                       example: Europe/Kyiv
 *                     current_weather:
 *                       type: object
 *                       properties:
 *                         temperature:
 *                           type: number
 *                           example: 20
 *                         feels_like:
 *                           type: number
 *                           example: 19
 *                         condition:
 *                           type: string
 *                           example: Clear
 *                         humidity:
 *                           type: number
 *                           example: 60
 *                         wind_speed:
 *                           type: number
 *                           example: 3.5
 *                         icon:
 *                           type: string
 *                           example: clear-day
 *                     today_forecast:
 *                       type: object
 *                       properties:
 *                         temp_max:
 *                           type: number
 *                           example: 23
 *                         temp_min:
 *                           type: number
 *                           example: 12
 *                         sunrise:
 *                           type: string
 *                           example: 06:12:00
 *                         sunset:
 *                           type: string
 *                           example: 20:45:00
 *                         description:
 *                           type: string
 *                           example: Sunny with light clouds
 *       400:
 *         description: City query parameter is missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: City is required
 *       404:
 *         description: City not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: City not found
 *       502:
 *         description: External weather API error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: External API error
 */

router.get("/", validate(getWeatherSchema), asyncWrapper(weatherController));

module.exports = router;
