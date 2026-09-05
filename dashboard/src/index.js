import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import "./index.css";

import TopBar from "./components/TopBar";
import Summary from "./components/Summary";
import Orders from "./components/Orders";
import Holdings from "./components/Holdings";
import Positions from "./components/Positions";
import Funds from "./components/Funds";
import Apps from "./components/Apps";


// ======================================================
// DASHBOARD LAYOUT
// ======================================================

const DashboardLayout = () => {
  return (
    <>
      <TopBar />

      <main>
        <Outlet />
      </main>
    </>
  );
};


// ======================================================
// REACT APP
// ======================================================

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

const userData = new URLSearchParams(
  window.location.hash.slice(1)
).get("user");

if (userData) {
  try {
    const user = JSON.parse(
      decodeURIComponent(userData)
    );

    localStorage.setItem(
      "stockifyUser",
      JSON.stringify(user)
    );

    window.history.replaceState(
      {},
      document.title,
      window.location.pathname
    );
  } catch (error) {
    console.error(
      "Unable to load logged-in user:",
      error
    );
  }
}


root.render(
  <React.StrictMode>
    <BrowserRouter>

      <Routes>

        {/* ==============================================
            ALL DASHBOARD PAGES
            TopBar remains visible on every page
        ============================================== */}

        <Route element={<DashboardLayout />}>

          {/* Dashboard */}
          <Route
            path="/"
            element={<Summary />}
          />

          {/* Orders */}
          <Route
            path="/orders"
            element={<Orders />}
          />

          {/* Holdings */}
          <Route
            path="/holdings"
            element={<Holdings />}
          />

          {/* Positions */}
          <Route
            path="/positions"
            element={<Positions />}
          />

          {/* Funds */}
          <Route
            path="/funds"
            element={<Funds />}
          />

          {/* Apps */}
          <Route
            path="/apps"
            element={<Apps />}
          />

        </Route>


        {/* ==============================================
            UNKNOWN URL
        ============================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  </React.StrictMode>
);