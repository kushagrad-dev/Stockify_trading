import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL, DASHBOARD_URL } from "../../config/api";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Unable to log in.");
      }

      localStorage.setItem("stockifyToken", result.token);
      localStorage.setItem("stockifyUser", JSON.stringify(result.data));
      setStatus({ type: "success", message: `Welcome back, ${result.data.name}! Opening your dashboard…` });
      window.location.assign(`${DASHBOARD_URL}/#token=${encodeURIComponent(result.token)}`);
    } catch (error) {
      setStatus({ type: "danger", message: error.message || "Unable to reach the server. Please try again." });
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
              <h1 className="h2 mb-2">Log in to Stockify</h1>
              <p className="text-muted mb-4">
                New to Stockify? <Link to="/signup">Create an account</Link>
              </p>
              {status.message && <div className={`alert alert-${status.type}`} role="alert">{status.message}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="email">Email address</label>
                  <input className="form-control" id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} required disabled={isSubmitting} />
                </div>
                <div className="mb-4">
                  <label className="form-label" htmlFor="password">Password</label>
                  <input className="form-control" id="password" name="password" type="password" autoComplete="current-password" value={formData.password} onChange={handleChange} required disabled={isSubmitting} />
                </div>
                <button className="btn btn-primary w-100" type="submit" disabled={isSubmitting}>{isSubmitting ? "Logging in…" : "Log in"}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
