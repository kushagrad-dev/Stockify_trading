# 📈 Stockify

> A full-stack stock trading dashboard built with React, Node.js, Express, and MongoDB.

Stockify is a full-stack trading simulation platform inspired by modern brokerage applications. It provides an interactive dashboard where users can view their portfolio, monitor stocks through a watchlist, place buy and sell orders, track holdings and positions, and calculate portfolio performance.

The project was built to understand how a real-world full-stack financial application works — from authentication and REST APIs to database operations, portfolio calculations, and frontend-backend integration.

---

## 🚀 Live Project

🌐 **Stockify:**  
Add your deployed frontend link here.

---

## 📸 Project Preview

### Dashboard

The dashboard provides a complete overview of the user's trading account.

It displays:

- Available margin
- Current portfolio value
- Total portfolio P&L
- Overall return
- Margin utilization
- Opening balance
- Total holdings
- Top holdings
- Portfolio overview

---

## ✨ Features

### 🔐 Authentication

Stockify uses token-based authentication to protect the trading dashboard.

Features include:

- Login authentication
- JWT-based authorization
- Protected routes
- Persistent login using local storage
- Automatic authentication handling
- User-specific account information

Users cannot access the dashboard without valid authentication credentials.

---

### 📊 Dashboard

The dashboard provides a high-level overview of the trading account.

It includes:

- Margin available
- Current portfolio value
- Portfolio P&L
- Portfolio return
- Opening balance
- Margin utilization
- Total holdings
- Top holdings

The dashboard dynamically calculates portfolio performance from the user's holdings.

---

### 👀 Watchlist

The Watchlist allows users to monitor available stocks before placing an order.

Features:

- Stock search
- Stock symbols
- Current stock prices
- Percentage movement
- Up/down market indicators
- Buy button
- Sell button
- Market snapshot
- Price distribution chart

Example stocks included in the demo dataset:

- INFY
- ONGC
- TCS
- KPITTECH
- QUICKHEAL
- WIPRO
- M&M
- RELIANCE
- HUL

> Note: The current project uses demo/static market data for stock prices.

---

### 🟢 Buy Orders

Users can select a stock from the Watchlist and open the Buy window.

The Buy window allows users to:

- Select quantity
- View current stock price
- Calculate total order value
- Validate quantity
- Submit a buy order
- Cancel the order

The frontend sends the order to the backend through the REST API.

---

### 🔴 Sell Orders

Users can also sell stocks from the Watchlist.

Before placing a sell order, Stockify checks the user's holdings.

The system verifies:

- Whether the user owns the stock
- How many shares the user owns
- Whether the requested quantity is valid
- Whether the user is attempting to sell more shares than they own

For example:

```text
Available quantity: 5

User attempts to sell: 7

Result:
❌ Order rejected
"You only own 5 shares."
