import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL, DASHBOARD_URL } from "../../config/api";

function SignUp() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    if (formData.name.trim().length < 2) {
      setStatus({ type: "danger", message: "Enter your name." });
      return;
    }

    if (formData.password.length < 8) {
      setStatus({ type: "danger", message: "Password must be at least 8 characters." });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Unable to create your account.");
      }

      localStorage.setItem("stockifyToken", result.token);
      localStorage.setItem("stockifyUser", JSON.stringify(result.data));
      setStatus({ type: "success", message: "Account created. Opening your dashboard…" });
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
              <h1 className="h2 mb-2">Create your Stockify account</h1>
              <p className="text-muted mb-4">
                Start investing with Stockify. Already have an account?{" "}
                <Link to="/login">Log in</Link>
              </p>
              {status.message && <div className={`alert alert-${status.type}`} role="alert">{status.message}</div>}
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label" htmlFor="name">Full name</label>
                  <input className="form-control" id="name" name="name" type="text" autoComplete="name" value={formData.name} onChange={handleChange} required minLength="2" maxLength="80" disabled={isSubmitting} />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="email">Email address</label>
                  <input className="form-control" id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} required disabled={isSubmitting} />
                </div>
                <div className="mb-4">
                  <label className="form-label" htmlFor="password">Password</label>
                  <input className="form-control" id="password" name="password" type="password" autoComplete="new-password" value={formData.password} onChange={handleChange} required minLength="8" disabled={isSubmitting} />
                  <div className="form-text">Use at least 8 characters.</div>
                </div>
                <button className="btn btn-primary w-100" type="submit" disabled={isSubmitting}>{isSubmitting ? "Creating account…" : "Create account"}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignUp;
