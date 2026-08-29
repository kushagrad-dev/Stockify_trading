require("dotenv").config({ path: "../.env" });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3008;
const MONGO_URL = process.env.MONGO_URL;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Stockify backend is running",
  });
});

// Start server
const startServer = async () => {
  try {
    if (MONGO_URL) {
      await mongoose.connect(MONGO_URL);
      console.log("MongoDB connected successfully");
    } else {
      console.log("MONGO_URL not found in .env");
      console.log("Starting server without MongoDB...");
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.log("Starting server without MongoDB...");

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  }
};

startServer();