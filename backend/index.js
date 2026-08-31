require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { HoldingsModel } = require("./models/HoldingsModel");
const {ordersModel} = require("./models/OrdersModel");
const { HoldingsModel } = require("./models/HoldingsModel");
const { OrdersModel } = require("./models/OrdersModel");
const { PositionsModel } = require("./models/PositionsModel");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// =======================
// Middleware
// =======================
app.use(cors());
app.use(express.json());
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
// Add Sample Positions
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
    const positions = await HoldingsModel.insertMany(tempPositions);

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


app.post("/addOrders", async (req, res) => {
  const { name, qty, price, mode } = req.body;

  try {
    const newOrder = new ordersModel({
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
    const holdings = await HoldingsModel.find({}); //command used for finding or fetching data from database

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
    // Check MongoDB URL
    if (!MONGO_URL) {
      console.error(" MONGO_URL is missing in .env");
      process.exit(1);
    }

    // Connect MongoDB
    await mongoose.connect(MONGO_URL);

    console.log("MongoDB connected successfully");

    // Start Express server
    app.listen(PORT, () => {
      console.log(` Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(" MongoDB connection failed:");
    console.error(error.message);

    process.exit(1);
  }
};

startServer();