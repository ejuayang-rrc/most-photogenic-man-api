import express, { Express } from "express";

// Initialize Express application
const app: Express = express();

// Ensures incoming body is correctly parsed to JSON
app.use(express.json());

/**
 * Health check route that returns server status details
 * @returns server health metrics in a json response
 */
app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});
