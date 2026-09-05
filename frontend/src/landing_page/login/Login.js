import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL, DASHBOARD_URL } from "../../config/api";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus({
      type: "",
      message: "",
    });

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => ({}));

      // Backend error
      if (!response.ok) {
        throw new Error(
          result.message || "Unable to log in."
        );
      }

      // Make sure backend returned the expected data
      if (!result.token || !result.user) {
        console.error("Invalid login response:", result);

        throw new Error(
          "Login response is missing user or token."
        );
      }

      // Save JWT token
      localStorage.setItem(
        "stockifyToken",
        result.token
      );

      // Save logged-in user
      localStorage.setItem(
        "stockifyUser",
        JSON.stringify(result.user)
      );

      // Show success message
      setStatus({
        type: "success",
        message: `Welcome back, ${
          result.user.name || "User"
        }! Opening your dashboard…`,
      });

      // Redirect to dashboard
      window.location.assign(DASHBOARD_URL);
    } catch (error) {
      console.error("Login error:", error);

      setStatus({
        type: "danger",
        message:
          error.message ||
          "Unable to reach the server. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">

              <h1 className="h2 mb-2">
                Log in to Stockify
              </h1>

              <p className="text-muted mb-4">
                New to Stockify?{" "}
                <Link to="/signup">
                  Create an account
                </Link>
              </p>

              {status.message && (
                <div
                  className={`alert alert-${status.type}`}
                  role="alert"
                >
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* EMAIL */}
                <div className="mb-3">
                  <label
                    className="form-label"
                    htmlFor="email"
                  >
                    Email address
                  </label>

                  <input
                    className="form-control"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* PASSWORD */}
                <div className="mb-4">
                  <label
                    className="form-label"
                    htmlFor="password"
                  >
                    Password
                  </label>

                  <input
                    className="form-control"
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* LOGIN BUTTON */}
                <button
                  className="btn btn-primary w-100"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Logging in…"
                    : "Log in"}
                </button>

              </form>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;