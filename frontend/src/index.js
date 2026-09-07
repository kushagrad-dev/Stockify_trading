import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./index.css";

import HomePage from "./landing_page/home/HomePage";
import Signup from "./landing_page/signup/SignUp";
import Login from "./landing_page/login/Login";
import AboutPage from "./landing_page/about/AboutPage";
import ProductsPage from "./landing_page/products/ProductsPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import SupportPage from "./landing_page/support/SupportPage";
import Navbar from "./landing_page/navbar";
import Footer from "./landing_page/footer";
import Notfound from "./landing_page/Notfound";

const isExtensionError = (value) =>
  typeof value === "string" &&
  value.startsWith("chrome-extension://");

window.addEventListener(
  "error",
  (event) => {
    if (
      isExtensionError(event.filename) ||
      isExtensionError(event.error?.stack)
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  },
  true
);

window.addEventListener("unhandledrejection", (event) => {
  const stack =
    event.reason?.stack ||
    event.reason?.message;

  if (isExtensionError(stack)) {
    event.preventDefault();
  }
});

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/about"
          element={<AboutPage />}
        />

        <Route
          path="/products"
          element={<ProductsPage />}
        />

        <Route
          path="/pricing"
          element={<PricingPage />}
        />

        <Route
          path="/support"
          element={<SupportPage />}
        />

        <Route
          path="*"
          element={<Notfound />}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);