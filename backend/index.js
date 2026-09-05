const authRoutes = require("./routes/authRoutes");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { HoldingsModel } = require("./models/HoldingsModel");
const { OrdersModel } = require("./models/OrdersModel");
const { PositionsModel } = require("./models/PositionsModel");
const app = express();

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// =======================
// Middleware
// =======================

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  ...(process.env.CLIENT_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
];

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
app.use("/auth", authRoutes);

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
// Authentication Middleware
// =======================

const requireAuthentication = (req, res, next) => {

  const authorization = req.headers.authorization || "";

  const token = authorization.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication is required",
    });
  }

  try {
    req.auth = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Your session is invalid or has expired",
    });
  }
};



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

    return res.status(201).json({
      success: true,
      message: "Positions added successfully",
      data: positions,
    });
  } catch (error) {
    console.error("Error adding positions:", error);

    return res.status(500).json({
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

    return res.status(200).json({
      success: true,
      data: positions,
    });
  } catch (error) {
    console.error("Error fetching positions:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch positions",
      error: error.message,
    });
  }
});

// =======================
// Add BUY Order
// =======================

app.post("/addOrders", async (req, res) => {
  const { name, qty, price, mode } = req.body;

  const quantity = Number(qty);
  const orderPrice = Number(price);

  if (!name || !String(name).trim()) {
    return res.status(400).json({
      success: false,
      message: "Stock name is required",
    });
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({
      success: false,
      message: "Quantity must be a positive whole number",
    });
  }

  if (!Number.isFinite(orderPrice) || orderPrice <= 0) {
    return res.status(400).json({
      success: false,
      message: "A valid stock price is required",
    });
  }

  try {
    const stockName = String(name).trim();

    const newOrder = new OrdersModel({
      name: stockName,
      qty: quantity,
      price: orderPrice,
      mode: mode || "BUY",
    });

    const savedOrder = await newOrder.save();

    return res.status(201).json({
      success: true,
      message: "Order added successfully",
      data: savedOrder,
    });
  } catch (error) {
    console.error("Error adding order:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add order",
      error: error.message,
    });
  }
});
// =======================
// Sell Order
// =======================
app.post("/sellOrder", async (req, res) => {
  const { name, qty, price } = req.body;

  try {
    // Validate input
    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Stock name is required",
      });
    }

    const quantity = Number(qty);
    const sellPrice = Number(price);

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive whole number",
      });
    }

    if (!Number.isFinite(sellPrice) || sellPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be greater than 0",
      });
    }

    const stockName = name.trim().toUpperCase();

    // Find the holding
    const holding = await HoldingsModel.findOne({
      name: new RegExp(`^${stockName}$`, "i"),
    });

    if (!holding) {
      return res.status(404).json({
        success: false,
        message: `You do not own any ${stockName} shares`,
      });
    }

    const ownedQuantity = Number(holding.qty) || 0;

    // Check available quantity
    if (quantity > ownedQuantity) {
      return res.status(400).json({
        success: false,
        message: `You only own ${ownedQuantity} share${
          ownedQuantity === 1 ? "" : "s"
        } of ${stockName}`,
      });
    }

    const remainingQuantity = ownedQuantity - quantity;

    // Create SELL order
    const newOrder = new OrdersModel({
      name: stockName,
      qty: quantity,
      price: sellPrice,
      mode: "SELL",
    });

    const savedOrder = await newOrder.save();

    // IMPORTANT:
    // Actually update the holding in MongoDB
    if (remainingQuantity === 0) {
      await HoldingsModel.deleteOne({
        _id: holding._id,
      });
    } else {
      holding.qty = remainingQuantity;

      // Keep the current market price
      holding.price = sellPrice;

      await holding.save();
    }

    return res.status(200).json({
      success: true,
      message: `${quantity} share${
        quantity === 1 ? "" : "s"
      } of ${stockName} sold successfully`,
      data: {
        order: savedOrder,
        remainingQuantity,
      },
    });
  } catch (error) {
    console.error("Error selling stock:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to sell stock",
      error: error.message,
    });
  }
});

// =======================
// Fetch Orders
// =======================

app.get("/orders", async (req, res) => {
  try {
    const orders = await OrdersModel.find({}).sort({
      _id: -1,
    });

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
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

    return res.status(200).json({
      success: true,
      data: holdings,
    });
  } catch (error) {
    console.error("Error fetching holdings:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch holdings",
      error: error.message,
    });
  }
});

// =======================
// Environment Variables
// =======================

const PORT = 3008;
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
