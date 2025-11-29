import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

import imageRoutes from "../src/api/v1/routes/imageRoutes";
import commentRoutes from "../src/api/v1/routes/commentRoutes";
import eventRoutes from "../src/api/v1/routes/eventRoutes";

// Get environment variables
require("dotenv").config();

// Initialize Express application
const app: Express = express();

// Morgan for HTTP request logging
app.use(morgan("combined"));

// Ensures incoming body is correctly parsed to JSON
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

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

app.use("/api/v1/image", imageRoutes);
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/comment", commentRoutes);

export default app;
