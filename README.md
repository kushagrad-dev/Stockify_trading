📈 Stockify

Stockify is a full-stack stock market portfolio and trading dashboard designed to provide users with a simple interface for managing holdings, viewing positions, placing orders, and accessing their account through secure authentication.

The project is built using React, Node.js, Express, MongoDB, JWT, and Material UI.

⸻

  Features

 Authentication

* User signup and account creation
* Secure password hashing using bcrypt
* User login with JWT authentication
* Authenticated user profile endpoint
* Session/token validation
* Email validation
* Password validation
* Duplicate account protection

Trading Dashboard

* View stock holdings
* View current positions
* Add and manage orders
* Portfolio-oriented dashboard
* Charts and data visualization
* Responsive dashboard interface

Backend

* REST API built with Express
* MongoDB database integration using Mongoose
* Authentication and authorization using JWT
* Password hashing using bcrypt
* CORS configuration
* Environment-variable based configuration
* Error handling for API requests

⸻

Tech Stack

Frontend

* React 19
* React Router
* Axios
* React Scripts

Dashboard

* React 18
* Material UI
* Chart.js
* React Chart.js 2
* React Router
* Axios

Backend

* Node.js
* Express.js
* Mongoose
* MongoDB
* JSON Web Tokens (JWT)
* bcryptjs
* CORS
* dotenv

⸻

Project Structure

Stockify/
│
├── backend/
│   ├── models/
│   │   ├── HoldingsModel.js
│   │   ├── OrdersModel.js
│   │   ├── PositionsModel.js
│   │   └── UserModel.js
│   │
│   ├── schemas/
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── build/
│   ├── netlify.toml
│   ├── package.json
│   └── package-lock.json
│
├── dashboard/
│   ├── src/
│   ├── netlify.toml
│   ├── package.json
│   └── package-lock.json
│
├── .env
├── .env.example
└── .gitignore

⸻

Authentication

Stockify uses JWT-based authentication.

Signup

POST /auth/signup

Request:

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}

The server validates the information, hashes the password using bcrypt, creates the account, and returns a JWT token.

Login

POST /auth/login

Request:

{
  "email": "test@example.com",
  "password": "password123"
}

A successful login returns a JWT token and basic user information.

Current User

GET /auth/me

This endpoint requires a valid JWT:

Authorization: Bearer <token>

⸻

🔌 API Endpoints

Authentication

Method	Endpoint	Description
POST	/auth/signup	Create a new account
POST	/auth/login	Login to an account
GET	/auth/me	Get authenticated user information

Positions

Method	Endpoint	Description
GET	/allpositions	Get all positions
GET	/addPositions	Add sample positions

Holdings

Method	Endpoint	Description
GET	/allholdings	Get all holdings

Orders

Method	Endpoint	Description
POST	/addOrders	Create a new order

Server

Method	Endpoint	Description
GET	/	Check backend status

⸻

⚙️ Environment Variables

The backend uses environment variables for sensitive configuration.

Create a .env file in the project root:

MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
CLIENT_ORIGIN=http://localhost:3000,http://localhost:3001

Variable Description

Variable	Purpose
MONGO_URL	MongoDB connection string
JWT_SECRET	Secret used to sign JWT tokens
CLIENT_ORIGIN	Allowed frontend origins for CORS

⚠️ Never commit your .env file or expose your MONGO_URL or JWT_SECRET publicly.

⸻

Installation

1. Clone the repository

git clone <YOUR_GITHUB_REPOSITORY_URL>

Move into the project:

cd Stockify

⸻

2. Install backend dependencies

cd backend
npm install

⸻

3. Install frontend dependencies

Open another terminal:

cd frontend
npm install

⸻

4. Install dashboard dependencies

Open another terminal:

cd dashboard
npm install

⸻

Running the Project Locally

Stockify consists of three applications.

Start the backend

cd backend
npm start

The backend runs on:

http://localhost:3008

Start the frontend

cd frontend
npm start

The frontend normally runs on:

http://localhost:3000

Start the dashboard

cd dashboard
npm start

The dashboard normally runs on:

http://localhost:3001

⸻

MongoDB

Stockify uses MongoDB as its database.

Mongoose is used to connect the Express backend to MongoDB.

The connection string is provided through:

MONGO_URL=your_mongodb_connection_string

The database stores application data such as:

* Users
* Holdings
* Orders
* Positions

⸻

Deployment

The project can be deployed using separate services for the frontend and backend.

Frontend

The React frontend can be deployed using Netlify.

Dashboard

The dashboard can also be deployed using Netlify.

Backend

The Express backend requires a Node.js hosting service such as Render, Railway, or another server platform.

Database

MongoDB can be hosted using MongoDB Atlas.

The production architecture is therefore:

                 ┌──────────────────┐
                 │     Netlify      │
                 │ React Frontend   │
                 └────────┬─────────┘
                          │
                          │ HTTPS API
                          ▼
                 ┌──────────────────┐
                 │  Backend Server  │
                 │ Node + Express   │
                 └────────┬─────────┘
                          │
                          │ Mongoose
                          ▼
                 ┌──────────────────┐
                 │  MongoDB Atlas   │
                 │    Database      │
                 └──────────────────┘

⸻

Security

Stockify implements several security measures:

* Passwords are hashed using bcrypt.
* Passwords are never returned in API responses.
* JWT tokens are used for authentication.
* Protected endpoints verify JWT tokens.
* Email addresses are normalized before database lookup.
* Duplicate email addresses are rejected.
* CORS is configured to restrict browser origins.
* Sensitive configuration is stored in environment variables.

⸻

Testing

Frontend tests can be executed using:

cd frontend
npm test

Dashboard tests can be executed using:

cd dashboard
npm test

A production build can be tested with:

npm run build

⸻

Production Builds

Build the frontend:

cd frontend
npm run build

Build the dashboard:

cd dashboard
npm run build

The generated production files can then be deployed through the selected hosting platform.

⸻

Future Improvements

Potential improvements for Stockify include:

* Real-time stock prices
* Live market data integration
* Buy/sell transaction processing
* User-specific holdings and positions
* Portfolio performance tracking
* Transaction history
* Watchlists
* Advanced stock charts
* Password reset
* Email verification
* Refresh-token based authentication
* Improved role-based authorization
* Enhanced mobile responsiveness

⸻

👨‍💻 Author

Kushagra Dubey

Stockify is a full-stack project created to explore modern web development, financial dashboards, authentication, REST APIs, and database-driven applications.

⸻

⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
