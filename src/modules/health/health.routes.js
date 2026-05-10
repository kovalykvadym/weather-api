const express = require("express");
const healthController = require("./health.controller");
const router = express.Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns API health status, Redis connection state, server uptime, and current timestamp.
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API is running successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: ok
 *                     redis:
 *                       type: string
 *                       enum:
 *                         - connected
 *                         - disconnected
 *                       example: connected
 *                     uptime:
 *                       type: number
 *                       example: 523.42
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                       example: 2026-05-10T12:00:00.000Z
 */

router.get("/", healthController);

module.exports = router;
