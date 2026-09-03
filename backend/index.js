const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { HoldingsModel } = require("./models/HoldingsModel");
const { OrdersModel } = require("./models/OrdersModel");
const { PositionsModel } = require("./models/PositionsModel");
const { UserModel } = require("./models/UserModel");

const app = express();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// =======================
// Middleware
// =======================
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Requests made outside a browser do not include an Origin header.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin is not allowed by CORS"));
    },
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// =======================
// Basic Route     
// =======================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Stockify backend is running",
  });
});

// =======================
// User Signup
// =======================
app.post("/auth/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and password are required",
    });
  }

  const trimmedName = name.trim();
  const normalizedEmail = email.trim().toLowerCase();

  if (trimmedName.length < 2 || trimmedName.length > 80) {
    return res.status(400).json({
      success: false,
      message: "Name must be between 2 and 80 characters",
    });
  }

  if (!emailPattern.test(normalizedEmail) || normalizedEmail.length > 254) {
    return res.status(400).json({
      success: false,
      message: "Enter a valid email address",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters",
    });
  }

  try {
    const existingUser = await UserModel.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name: trimmedName,
      email: normalizedEmail,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    if (error && error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create account",
    });
  }
});

// =======================
// User Login
// =======================
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await UserModel.findOne({
      email: normalizedEmail,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT_SECRET is missing in .env",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to login",
      error: error.message,
    });
  }
});

// =======================
// Add Sample Positions
// =======================
app.get("/addPositions", async (req, res) => {
  const tempPositions = [
    {
      product: "CNC",
      name: "EVEREADY",
      qty: 2,
      avg: 316.27,
      price: 1902.1,
      net: "+0.58%",
      day: "-1.94%",
      isLoss: true,
    },
    {
      product: "CNC",
      name: "HDFCBANK",
      qty: 2,
      avg: 1383.4,
      price: 727.2,
      net: "+10.04%",
      day: "-0.04%",
      isLoss: false,
    },
  ];

  try {
    const positions = await PositionsModel.insertMany(
      tempPositions
    );

    res.status(201).json({
      success: true,
      message: "Positions added successfully",
      data: positions,
    });
  } catch (error) {
    console.error("Error adding positions:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add positions",
      error: error.message,
    });
  }
});

// =======================
// Get All Positions
// =======================
app.get("/allpositions", async (req, res) => {
  try {
    const positions = await PositionsModel.find({});

    res.status(200).json({
      success: true,
      data: positions,
    });
  } catch (error) {
    console.error("Error fetching positions:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch positions",
      error: error.message,
    });
  }
});

// =======================
// Add Order
// =======================
app.post("/addOrders", async (req, res) => {
  const { name, qty, price, mode } = req.body;

  try {
    const newOrder = new OrdersModel({
      name,
      qty,
      price,
      mode,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order added successfully",
      data: savedOrder,
    });
  } catch (error) {
    console.error("Error adding order:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add order",
      error: error.message,
    });
  }
});

// =======================
// Get All Holdings
// =======================
app.get("/allholdings", async (req, res) => {
  try {
    const holdings = await HoldingsModel.find({});

    res.status(200).json({
      success: true,
      data: holdings,
    });
  } catch (error) {
    console.error("Error fetching holdings:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch holdings",
      error: error.message,
    });
  }
});

// =======================
// Environment Variables
// =======================
const PORT = process.env.PORT || 3008;
const MONGO_URL = process.env.MONGO_URL;

// =======================
// Start Server
// =======================
const startServer = async () => {
  try {
    if (!MONGO_URL) {
      console.error("MONGO_URL is missing in .env");
      process.exit(1);
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in .env");
      process.exit(1);
    }

    await mongoose.connect(MONGO_URL);

    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(
        `Stockify backend running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error(error.message);

    process.exit(1);
  }
};

startServer();
