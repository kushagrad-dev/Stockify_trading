import React from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  return (
    <main className="stockify-orders-page">
      <style>{`
        .stockify-orders-page {
          width: 100%;
          max-width: 1180px;
          min-height: 420px;
          margin: 0 auto;
          padding: 32px 34px 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fafafa;
          color: #202124;
          font-family: -apple-system, BlinkMacSystemFont,
            "Segoe UI", Roboto, Arial, sans-serif;
          box-sizing: border-box;
        }

        .stockify-orders-page * {
          box-sizing: border-box;
        }

        .stockify-orders-card {
          width: min(560px, 100%);
          padding: 44px 36px;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          background: #ffffff;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.04);
          text-align: center;
        }

        .stockify-orders-icon {
          width: 54px;
          height: 54px;
          margin: 0 auto 18px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid #dce8f6;
          border-radius: 50%;

          background: #f3f8fd;
          color: #387ed1;

          font-size: 23px;
          font-weight: 600;
        }

        .stockify-orders-eyebrow {
          margin: 0 0 7px;

          color: #8a9099;

          font-size: 10px;
          font-weight: 700;

          letter-spacing: 0.13em;
        }

        .stockify-orders-title {
          margin: 0;

          color: #202124;

          font-size: 22px;
          font-weight: 500;

          line-height: 1.3;
        }

        .stockify-orders-description {
          max-width: 430px;

          margin: 10px auto 24px;

          color: #737983;

          font-size: 12px;

          line-height: 1.6;
        }

        .stockify-orders-button {
          display: inline-flex;

          align-items: center;
          justify-content: center;

          min-width: 120px;
          min-height: 38px;

          padding: 0 18px;

          border-radius: 7px;

          background: #387ed1;
          color: #ffffff;

          font-size: 11px;
          font-weight: 600;

          text-decoration: none;

          transition:
            background 0.15s ease,
            transform 0.15s ease;
        }

        .stockify-orders-button:hover {
          background: #2868b5;
          transform: translateY(-1px);
        }

        .stockify-orders-button:focus-visible {
          outline: 3px solid rgba(56, 126, 209, 0.2);
          outline-offset: 2px;
        }

        @media (max-width: 600px) {
          .stockify-orders-page {
            min-height: 360px;
            padding: 24px 18px 40px;
          }

          .stockify-orders-card {
            padding: 34px 22px;
          }

          .stockify-orders-title {
            font-size: 20px;
          }
        }

        @media (max-width: 400px) {
          .stockify-orders-page {
            padding: 20px 13px 32px;
          }

          .stockify-orders-card {
            padding: 30px 18px;
          }
        }
      `}</style>

      <section className="stockify-orders-card">
        <div
          className="stockify-orders-icon"
          aria-hidden="true"
        >
          ₹
        </div>

        <p className="stockify-orders-eyebrow">
          ORDER HISTORY
        </p>

        <h1 className="stockify-orders-title">
          You haven't placed any orders today
        </h1>

        <p className="stockify-orders-description">
          Your orders will appear here once you place a
          trade. Head back to the dashboard and choose a
          stock to get started.
        </p>

        <Link
          to="/"
          className="stockify-orders-button"
        >
          Get started
        </Link>
      </section>
    </main>
  );
};

export default Orders;