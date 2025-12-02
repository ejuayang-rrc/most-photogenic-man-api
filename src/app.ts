import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

import errorHandler from "./api/v1/middleware/errorHandler";
import imageRoutes from "../src/api/v1/routes/imageRoutes";
import commentRoutes from "../src/api/v1/routes/commentRoutes";
import eventRoutes from "../src/api/v1/routes/eventRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";
import userRoutes from "./api/v1/routes/userRoutes";
import { validationMiddleware } from "./api/v1/middleware/validation";

require("dotenv").config();

const app: Express = express();

app.use(morgan("combined"));

// Ensures incoming body is correctly parsed to JSON
app.use(express.json());

// Use validation middleware
app.use(validationMiddleware);

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

// For auth
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/users", userRoutes);

app.use(errorHandler)

export default app;
