# Weather API

A robust Node.js REST API that fetches current weather and forecasts for a given city. It integrates with a 3rd-party weather service and utilizes Redis caching to optimize external API calls, reduce latency, and prevent rate-limiting issues.

## 🚀 Features

- **External API Integration:** Fetches real-time weather data and forecasts.
- **Redis Caching:** Caches weather responses to improve performance (Cache Hit/Miss metadata included).
- **API Versioning:** Structured with `/api/v1` prefix for future scalability.
- **Request Traceability:** Generates and injects `X-Request-Id` into headers and logs.
- **Standardized Responses:** Uniform JSON response format with metadata for all endpoints.
- **Resilience:** Graceful shutdown implementation for both HTTP server and Redis connections.
- **Security:** Rate limiting and request validation using Joi.
- **Documentation:** Interactive API documentation using Swagger UI.
- **Dockerized:** Fully containerized with Docker and Docker Compose.
- **CI/CD:** Automated testing and linting via GitHub Actions.

## 🛠 Tech Stack

- **Runtime:** Node.js 24
- **Framework:** Express.js 5
- **Caching:** Redis
- **Validation:** Joi
- **Linting & Formatting:** Biome
- **Testing:** Jest & Supertest

## ⚙️ Prerequisites

Before you begin, ensure you have met the following requirements:
- [Node.js](https://nodejs.org/) (v24 or higher)
- [Docker](https://www.docker.com/) and Docker Compose (for containerized setup)
- A valid API key from [Visual Crossing Weather API](https://www.visualcrossing.com/)

## 🔧 Environment Variables

Create a `.env` file in the root directory based on the `.env.example` file:

```env
PORT=3000
WEATHER_API_KEY=your_visual_crossing_api_key_here
REDIS_URL=redis://localhost:6379
```


## 🏃‍♂️ Getting Started

**Option 1: Running via Docker (Recommended)**

The easiest way to run the application and Redis together is using Docker Compose.
```bash
# Build and start the containers
docker-compose up --build

# The API will be available at http://localhost:3000
```

**Option 2: Running Locally**

If you want to run the Node.js app locally, you still need a running Redis instance.
```bash
# 1. Start Redis (using Docker)
docker run -d -p 6379:6379 --name my-redis redis:8.6.3-alpine3.23

# 2. Install dependencies
npm ci

# 3. Start the application in development mode
npm run dev
```

## 📚 API Documentation

Once the server is running, you can access the interactive Swagger UI documentation at:
http://localhost:3000/api-docs

### 🚦 Endpoints Overview

- `GET /api/v1/health` - Check application and Redis health status.
- `GET /api/v1/weather?city={cityName}` - Get current weather and today's forecast for a specific city.

### 📜 Available Scripts

- `npm start` - Starts the application in production mode.
- `npm run dev` - Starts the application with Nodemon for local development.
- `npm test` - Runs the Jest test suite.
- `npm run lint` - Checks code formatting and linting rules using Biome.
- `npm run format` - Automatically fixes Biome formatting issues.