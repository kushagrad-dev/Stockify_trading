import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import WatchList from "./components/WatchList";
import { GeneralContextProvider } from "./components/GeneralContext";
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

const FRONTEND_URL = "http://10.137.184.93:3000";
const LOGIN_URL = `${FRONTEND_URL}/login`;
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("stockifyToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


/*
 * ======================================================
 * RECEIVE LOGIN DATA FROM FRONTEND
 * ======================================================
 */

const receiveLoginData = () => {
  try {
    const params = new URLSearchParams(
      window.location.search
    );

    const auth = params.get("auth");

    if (!auth) {
      return;
    }

    const decoded = JSON.parse(
      atob(decodeURIComponent(auth))
    );

    const token = decoded?.token;
    const user = decoded?.user;

    if (!token || !user) {
      console.error(
        "Invalid authentication data received."
      );
      return;
    }

    localStorage.setItem(
      "stockifyToken",
      token
    );

    localStorage.setItem(
      "stockifyUser",
      JSON.stringify(user)
    );

    console.log(
      "Stockify login successful:",
      user
    );

    /*
     * Remove the authentication data from
     * the browser URL.
     */
    window.history.replaceState(
      {},
      document.title,
      window.location.pathname
    );

  } catch (error) {
    console.error(
      "Unable to receive login data:",
      error
    );
  }
};


/*
 * ======================================================
 * PROCESS LOGIN DATA FIRST
 * ======================================================
 */

receiveLoginData();


/*
 * ======================================================
 * PROTECTED ROUTE
 * ======================================================
 */

const ProtectedRoute = () => {
  const token = localStorage.getItem(
    "stockifyToken"
  );

  const user = localStorage.getItem(
    "stockifyUser"
  );

  /*
   * Both token and user information are required.
   */
  if (!token || !user) {
    window.location.replace(LOGIN_URL);

    return null;
  }

  return <Outlet />;
};


/*
 * ======================================================
 * DASHBOARD LAYOUT
 * ======================================================
 */

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


/*
 * ======================================================
 * REACT ROOT
 * ======================================================
 */

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <GeneralContextProvider>

      <BrowserRouter>

        <Routes>

          {/* ==========================================
              PROTECTED DASHBOARD
              ========================================== */}

          <Route element={<ProtectedRoute />}>

            <Route
              element={<DashboardLayout />}
            >

              <Route
                path="/"
                element={<Summary />}
              />
              <Route
              path="/watchlist"
              element={<WatchList />}
              />

              <Route
                path="/orders"
                element={<Orders />}
              />

              <Route
                path="/holdings"
                element={<Holdings />}
              />

              <Route
                path="/positions"
                element={<Positions />}
              />

              <Route
                path="/funds"
                element={<Funds />}
              />

              <Route
                path="/apps"
                element={<Apps />}
              />

            </Route>

          </Route>


          {/* ==========================================
              UNKNOWN ROUTES
              ========================================== */}

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

    </GeneralContextProvider>
  </React.StrictMode>
);