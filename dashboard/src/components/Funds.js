import React from "react";
import { Link } from "react-router-dom";
import { holdings } from "../data/data";

const OPENING_BALANCE = 100000;

const formatCurrency = (value) =>
  `₹${Number(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const Funds = () => {
  const usedMargin = holdings.reduce(
    (total, stock) =>
      total + Number(stock.price || 0) * Number(stock.qty || 0),
    0
  );

  const availableMargin = OPENING_BALANCE - usedMargin;
  const availableCash = Math.max(availableMargin, 0);

  const utilization =
    OPENING_BALANCE > 0
      ? (usedMargin / OPENING_BALANCE) * 100
      : 0;

  const progress = Math.min(Math.max(utilization, 0), 100);
  const isOverLimit = availableMargin < 0;

  const details = [
    ["Opening balance", OPENING_BALANCE],
    ["Payin", 0],
    ["SPAN", 0],
    ["Delivery margin", 0],
    ["Exposure", 0],
    ["Options premium", 0],
    ["Collateral (Liquid funds)", 0],
    ["Collateral (Equity)", 0],
  ];

  return (
    <>
      <style>{`
        .stockify-funds-page {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          padding: 32px 36px 50px;
          box-sizing: border-box;
          color: #202124;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
        }

        .stockify-funds-page * {
          box-sizing: border-box;
        }

        .stockify-funds-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 28px;
        }

        .stockify-funds-kicker {
          margin: 0 0 7px;
          color: #8a9099;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .14em;
        }

        .stockify-funds-title {
          margin: 0;
          color: #202124;
          font-size: 28px;
          font-weight: 500;
          line-height: 1.2;
        }

        .stockify-funds-subtitle {
          margin: 7px 0 0;
          color: #737983;
          font-size: 13px;
          line-height: 1.5;
        }

        .stockify-funds-actions {
          display: flex;
          gap: 10px;
          flex-shrink: 0;
        }

        .stockify-funds-button {
          min-width: 105px;
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 17px;
          border-radius: 5px;
          border: 1px solid #387ed1;
          background: #387ed1;
          color: #fff;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          transition: opacity .15s ease, transform .15s ease;
        }

        .stockify-funds-button:hover {
          opacity: .9;
          transform: translateY(-1px);
        }

        .stockify-funds-button.secondary {
          background: #fff;
          color: #387ed1;
        }

        .stockify-funds-summary {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .stockify-funds-summary-card {
          min-width: 0;
          min-height: 128px;
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, .035);
        }

        .stockify-funds-summary-card.available {
          border-color: #d8e9dc;
        }

        .stockify-funds-summary-label {
          display: block;
          margin-bottom: 9px;
          color: #737983;
          font-size: 12px;
        }

        .stockify-funds-summary-value {
          margin: 0;
          color: #202124;
          font-size: 24px;
          font-weight: 600;
          line-height: 1.2;
        }

        .stockify-funds-summary-card.available
        .stockify-funds-summary-value {
          color: #2e7d32;
        }

        .stockify-funds-summary-note {
          display: block;
          margin-top: 8px;
          color: #8a9099;
          font-size: 11px;
        }

        .stockify-funds-main {
          display: grid;
          grid-template-columns: minmax(0, 1.6fr) minmax(280px, .85fr);
          gap: 24px;
          align-items: start;
        }

        .stockify-funds-card {
          min-width: 0;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, .035);
          overflow: hidden;
        }

        .stockify-funds-card-inner {
          padding: 24px;
        }

        .stockify-funds-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 22px;
        }

        .stockify-funds-card-kicker {
          margin: 0 0 5px;
          color: #8a9099;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .13em;
        }

        .stockify-funds-card-title {
          margin: 0;
          color: #202124;
          font-size: 18px;
          font-weight: 600;
        }

        .stockify-funds-status {
          flex-shrink: 0;
          padding: 5px 9px;
          border-radius: 20px;
          background: #eef8f0;
          color: #2e7d32;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .08em;
        }

        .stockify-funds-status.warning {
          background: #fff1f1;
          color: #c62828;
        }

        .stockify-funds-meter {
          margin-bottom: 20px;
        }

        .stockify-funds-meter-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 8px;
          color: #737983;
          font-size: 12px;
        }

        .stockify-funds-meter-top strong {
          color: #30343b;
        }

        .stockify-funds-meter-track {
          width: 100%;
          height: 7px;
          overflow: hidden;
          border-radius: 99px;
          background: #edf0f2;
        }

        .stockify-funds-meter-fill {
          height: 100%;
          border-radius: inherit;
          background: #387ed1;
          transition: width .25s ease;
        }

        .stockify-funds-meter-fill.warning {
          background: #d14343;
        }

        .stockify-funds-key-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-bottom: 20px;
        }

        .stockify-funds-key-card {
          min-width: 0;
          padding: 13px;
          border-radius: 8px;
          background: #f8f9fa;
        }

        .stockify-funds-key-card span {
          display: block;
          margin-bottom: 6px;
          color: #858b94;
          font-size: 10px;
        }

        .stockify-funds-key-card strong {
          display: block;
          overflow: hidden;
          color: #30343b;
          font-size: 13px;
          font-weight: 600;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .stockify-funds-key-card:first-child strong {
          color: #2e7d32;
        }

        .stockify-funds-details {
          border-top: 1px solid #eceef1;
        }

        .stockify-funds-detail {
          min-height: 39px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          border-bottom: 1px solid #f0f1f2;
          color: #737983;
          font-size: 12px;
        }

        .stockify-funds-detail span:first-child {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .stockify-funds-detail span:last-child {
          flex-shrink: 0;
          color: #30343b;
          text-align: right;
          white-space: nowrap;
        }

        .stockify-funds-detail.total {
          min-height: 46px;
          border-bottom: 0;
          color: #30343b;
          font-weight: 600;
        }

        .stockify-funds-commodity {
          min-height: 100%;
        }

        .stockify-funds-commodity-inner {
          min-height: 390px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 26px;
        }

        .stockify-funds-commodity-icon {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          margin-bottom: 22px;
          border-radius: 12px;
          background: #f1f5f9;
          color: #387ed1;
          font-size: 20px;
          font-weight: 700;
        }

        .stockify-funds-commodity-title {
          margin: 7px 0 10px;
          color: #202124;
          font-size: 21px;
          font-weight: 600;
          line-height: 1.25;
        }

        .stockify-funds-commodity-text {
          margin: 0;
          color: #737983;
          font-size: 13px;
          line-height: 1.7;
        }

        .stockify-funds-benefits {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin: 22px 0;
          padding: 15px;
          border-radius: 9px;
          background: #f8f9fa;
          color: #555b64;
          font-size: 12px;
        }

        .stockify-funds-commodity-button {
          width: 100%;
          margin-top: auto;
          text-align: center;
        }

        @media (max-width: 900px) {
          .stockify-funds-page {
            padding: 26px 22px 40px;
          }

          .stockify-funds-main {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 650px) {
          .stockify-funds-page {
            padding: 20px 14px 32px;
          }

          .stockify-funds-header {
            align-items: stretch;
            flex-direction: column;
          }

          .stockify-funds-actions {
            width: 100%;
          }

          .stockify-funds-button {
            flex: 1;
          }

          .stockify-funds-summary {
            grid-template-columns: 1fr;
          }

          .stockify-funds-key-grid {
            grid-template-columns: 1fr;
          }

          .stockify-funds-card-inner,
          .stockify-funds-commodity-inner {
            padding: 18px;
          }
        }
      `}</style>

      <main className="stockify-funds-page">

        {/* Header */}
        <header className="stockify-funds-header">
          <div>
            <p className="stockify-funds-kicker">
              ACCOUNT
            </p>

            <h1 className="stockify-funds-title">
              Funds
            </h1>

            <p className="stockify-funds-subtitle">
              Manage your trading balance and available margin.
            </p>
          </div>

          <div className="stockify-funds-actions">

            <Link
              to="/add-funds"
              className="stockify-funds-button"
            >
              Add funds
            </Link>

            <Link
              to="/withdraw"
              className="stockify-funds-button secondary"
            >
              Withdraw
            </Link>

          </div>
        </header>

        {/* Summary Cards */}
        <section className="stockify-funds-summary">

          <div className="stockify-funds-summary-card available">

            <span className="stockify-funds-summary-label">
              Available margin
            </span>

            <h2 className="stockify-funds-summary-value">
              {formatCurrency(
                Math.max(availableMargin, 0)
              )}
            </h2>

            <small className="stockify-funds-summary-note">
              {isOverLimit
                ? "Margin limit exceeded"
                : "Available for new trades"}
            </small>

          </div>

          <div className="stockify-funds-summary-card">

            <span className="stockify-funds-summary-label">
              Used margin
            </span>

            <h2 className="stockify-funds-summary-value">
              {formatCurrency(usedMargin)}
            </h2>

            <small className="stockify-funds-summary-note">
              {utilization.toFixed(1)}% of opening balance
            </small>

          </div>

          <div className="stockify-funds-summary-card">

            <span className="stockify-funds-summary-label">
              Opening balance
            </span>

            <h2 className="stockify-funds-summary-value">
              {formatCurrency(OPENING_BALANCE)}
            </h2>

            <small className="stockify-funds-summary-note">
              Demo trading account
            </small>

          </div>

        </section>

        {/* Main Content */}
        <section className="stockify-funds-main">

          {/* Equity Card */}
          <article className="stockify-funds-card">

            <div className="stockify-funds-card-inner">

              <div className="stockify-funds-card-header">

                <div>
                  <p className="stockify-funds-card-kicker">
                    EQUITY
                  </p>

                  <h2 className="stockify-funds-card-title">
                    Trading funds
                  </h2>
                </div>

                <span
                  className={`stockify-funds-status ${
                    isOverLimit ? "warning" : ""
                  }`}
                >
                  {isOverLimit ? "LIMIT" : "ACTIVE"}
                </span>

              </div>

              {/* Margin Meter */}
              <div className="stockify-funds-meter">

                <div className="stockify-funds-meter-top">

                  <span>
                    Margin utilization
                  </span>

                  <strong>
                    {utilization.toFixed(1)}%
                  </strong>

                </div>

                <div className="stockify-funds-meter-track">

                  <div
                    className={`stockify-funds-meter-fill ${
                      isOverLimit ? "warning" : ""
                    }`}
                    style={{
                      width: `${progress}%`,
                    }}
                  />

                </div>

              </div>

              {/* Main Balance Cards */}
              <div className="stockify-funds-key-grid">

                <div className="stockify-funds-key-card">
                  <span>Available</span>
                  <strong>
                    {formatCurrency(availableCash)}
                  </strong>
                </div>

                <div className="stockify-funds-key-card">
                  <span>Used</span>
                  <strong>
                    {formatCurrency(usedMargin)}
                  </strong>
                </div>

                <div className="stockify-funds-key-card">
                  <span>Opening</span>
                  <strong>
                    {formatCurrency(OPENING_BALANCE)}
                  </strong>
                </div>

              </div>

              {/* Detailed Breakdown */}
              <div className="stockify-funds-details">

                {details.map(([label, value]) => (
                  <div
                    className="stockify-funds-detail"
                    key={label}
                  >
                    <span>
                      {label}
                    </span>

                    <span>
                      {formatCurrency(value)}
                    </span>
                  </div>
                ))}

                <div className="stockify-funds-detail total">

                  <span>
                    Total collateral
                  </span>

                  <span>
                    {formatCurrency(0)}
                  </span>

                </div>

              </div>

            </div>

          </article>

          {/* Commodity Card */}
          <article className="stockify-funds-card stockify-funds-commodity">

            <div className="stockify-funds-commodity-inner">

              <div className="stockify-funds-commodity-icon">
                ₹
              </div>

              <p className="stockify-funds-card-kicker">
                COMMODITY
              </p>

              <h2 className="stockify-funds-commodity-title">
                Commodity trading
              </h2>

              <p className="stockify-funds-commodity-text">
                Your commodity account is not enabled yet.
                Open an account to access commodity markets
                directly from your Stockify dashboard.
              </p>

              <div className="stockify-funds-benefits">

                <span>
                  ✓ Market access
                </span>

                <span>
                  ✓ Portfolio tracking
                </span>

                <span>
                  ✓ Unified dashboard
                </span>

              </div>

              <Link
                to="/commodity-account"
                className="stockify-funds-button stockify-funds-commodity-button"
              >
                Open commodity account
              </Link>

            </div>

          </article>

        </section>

      </main>
    </>
  );
};

export default Funds;