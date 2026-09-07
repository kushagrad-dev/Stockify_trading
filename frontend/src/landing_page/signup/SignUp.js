import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3008";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/signup`,
        {
          name,
          email,
          password,
        }
      );

      const user = response?.data?.user;

      if (!user) {
        setError("Signup failed.");
        return;
      }

      localStorage.setItem(
        "stockifyUser",
        JSON.stringify(user)
      );

      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to create account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="stockify-auth-page">
      <style>{`
        .stockify-auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: #f8fafc;
          color: #202124;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            Arial,
            sans-serif;
        }

        .stockify-auth-card {
          width: min(400px, 100%);
          padding: 28px;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          background: #ffffff;
          box-shadow:
            0 8px 30px rgba(0, 0, 0, 0.06);
        }

        .stockify-auth-kicker {
          margin: 0 0 6px;
          color: #387ed1;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .14em;
        }

        .stockify-auth-title {
          margin: 0;
          font-size: 25px;
          font-weight: 600;
        }

        .stockify-auth-subtitle {
          margin: 7px 0 24px;
          color: #737983;
          font-size: 12px;
        }

        .stockify-auth-field {
          margin-bottom: 15px;
        }

        .stockify-auth-label {
          display: block;
          margin-bottom: 7px;
          color: #555b64;
          font-size: 11px;
          font-weight: 600;
        }

        .stockify-auth-input {
          width: 100%;
          height: 43px;
          padding: 0 12px;
          border: 1px solid #dfe3e8;
          border-radius: 8px;
          outline: none;
          background: #fff;
          color: #202124;
          font-size: 13px;
        }

        .stockify-auth-input:focus {
          border-color: #387ed1;
          box-shadow:
            0 0 0 3px rgba(56, 126, 209, .1);
        }

        .stockify-auth-error {
          margin: 0 0 15px;
          padding: 10px 12px;
          border: 1px solid #f0d5d5;
          border-radius: 7px;
          background: #fff7f7;
          color: #c43d43;
          font-size: 10px;
          line-height: 1.45;
        }

        .stockify-auth-button {
          width: 100%;
          height: 43px;
          border: 0;
          border-radius: 8px;
          background: #387ed1;
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .stockify-auth-button:disabled {
          cursor: not-allowed;
          opacity: .55;
        }
      `}</style>

      <form
        className="stockify-auth-card"
        onSubmit={handleSubmit}
      >
        <p className="stockify-auth-kicker">
          STOCKIFY
        </p>

        <h1 className="stockify-auth-title">
          Create account
        </h1>

        <p className="stockify-auth-subtitle">
          Create your Stockify trading account.
        </p>

        <div className="stockify-auth-field">
          <label
            className="stockify-auth-label"
            htmlFor="stockify-signup-name"
          >
            Name
          </label>

          <input
            id="stockify-signup-name"
            className="stockify-auth-input"
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            autoComplete="name"
          />
        </div>

        <div className="stockify-auth-field">
          <label
            className="stockify-auth-label"
            htmlFor="stockify-signup-email"
          >
            Email
          </label>

          <input
            id="stockify-signup-email"
            className="stockify-auth-input"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            autoComplete="email"
          />
        </div>

        <div className="stockify-auth-field">
          <label
            className="stockify-auth-label"
            htmlFor="stockify-signup-password"
          >
            Password
          </label>

          <input
            id="stockify-signup-password"
            className="stockify-auth-input"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            autoComplete="new-password"
          />
        </div>

        {error && (
          <p className="stockify-auth-error">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="stockify-auth-button"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Sign up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;