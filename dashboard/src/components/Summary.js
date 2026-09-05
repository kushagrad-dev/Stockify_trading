import React, { useMemo } from "react";
import { holdings } from "../data/data";

const formatCurrency = (value) => {
  const amount = Number(value) || 0;

  return `₹${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const formatCompactCurrency = (value) => {
  const amount = Number(value) || 0;
  const absolute = Math.abs(amount);

  if (absolute >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)}Cr`;
  }

  if (absolute >= 100000) {
    return `₹${(amount / 100000).toFixed(2)}L`;
  }

  if (absolute >= 1000) {
    return `₹${(amount / 1000).toFixed(2)}k`;
  }

  return formatCurrency(amount);
};

const Summary = () => {
  const storedUser = localStorage.getItem("stockifyUser");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    user = null;
  }

  const userName =
    user?.name?.trim() ||
    user?.username?.trim() ||
    "User";

  const openingBalance = Number(user?.balance) || 0;

  const handleLogout = () => {
    // Remove all locally stored authentication data
    localStorage.removeItem("stockifyToken");
    localStorage.removeItem("stockifyUser");

    // Redirect directly to the frontend login page
    window.location.href = "/login";
  };

  const portfolio = useMemo(() => {
    if (!Array.isArray(holdings)) {
      return [];
    }

    return holdings.map((stock) => {
      const qty = Number(stock.qty) || 0;
      const avg = Number(stock.avg) || 0;
      const price = Number(stock.price) || 0;

      const investment = avg * qty;
      const currentValue = price * qty;

      return {
        ...stock,
        qty,
        avg,
        price,
        investment,
        currentValue,
      };
    });
  }, []);

  const totalInvestment = portfolio.reduce(
    (total, stock) => total + stock.investment,
    0
  );

  const currentValue = portfolio.reduce(
    (total, stock) => total + stock.currentValue,
    0
  );

  const pnl = currentValue - totalInvestment;

  const pnlPercent =
    totalInvestment > 0
      ? (pnl / totalInvestment) * 100
      : 0;

  const marginUsed = totalInvestment;

  const marginAvailable = Math.max(
    openingBalance - marginUsed,
    0
  );

  const utilization =
    openingBalance > 0
      ? Math.min(
          (marginUsed / openingBalance) * 100,
          100
        )
      : 0;

  return (
    <main className="stockify-summary-page">
      <style>{`
        .stockify-summary-page {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          padding: 30px 34px 50px;
          background: #fafafa;
          color: #202124;
          font-family: -apple-system, BlinkMacSystemFont,
            "Segoe UI", Roboto, Arial, sans-serif;
        }

        .stockify-summary-page * {
          box-sizing: border-box;
        }

        .stockify-summary-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 24px;
        }

        .stockify-summary-header-copy {
          min-width: 0;
        }

        .stockify-summary-eyebrow {
          margin: 0 0 6px;
          color: #8a9099;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .14em;
        }

        .stockify-summary-title {
          margin: 0;
          color: #202124;
          font-size: 28px;
          font-weight: 500;
          line-height: 1.2;
        }

        .stockify-summary-subtitle {
          margin: 7px 0 0;
          color: #737983;
          font-size: 12px;
          line-height: 1.5;
        }

        .stockify-summary-header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .stockify-summary-account-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 12px;
          border: 1px solid #dcebdd;
          border-radius: 20px;
          background: #f5fbf6;
          color: #2e7d32;
          font-size: 10px;
          font-weight: 700;
          white-space: nowrap;
        }

        .stockify-summary-account-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #2e7d32;
        }

        .stockify-summary-logout-button {
          padding: 8px 13px;
          border: 1px solid #f0d6d6;
          border-radius: 20px;
          background: #fff;
          color: #d14343;
          font-size: 10px;
          font-weight: 700;
          cursor: pointer;
          transition: background .2s ease, border-color .2s ease;
        }

        .stockify-summary-logout-button:hover {
          background: #fff5f5;
          border-color: #e8bcbc;
        }

        .stockify-summary-logout-button:active {
          transform: translateY(1px);
        }

        .stockify-summary-cards {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 20px;
        }

        .stockify-summary-card {
          min-width: 0;
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, .035);
        }

        .stockify-summary-card.primary {
          border-color: #d7e5f5;
          background: #fbfdff;
        }

        .stockify-summary-card-label {
          display: block;
          margin-bottom: 10px;
          color: #737983;
          font-size: 11px;
        }

        .stockify-summary-card-value {
          margin: 0;
          color: #202124;
          font-size: 27px;
          font-weight: 500;
          line-height: 1.2;
        }

        .stockify-summary-card.primary
        .stockify-summary-card-value {
          color: #387ed1;
        }

        .stockify-summary-card-note {
          display: block;
          margin-top: 8px;
          color: #8a9099;
          font-size: 10px;
        }

        .stockify-summary-card-note.profit {
          color: #2e7d32;
          font-weight: 600;
        }

        .stockify-summary-card-note.loss {
          color: #d14343;
          font-weight: 600;
        }

        .stockify-summary-panels {
          display: grid;
          grid-template-columns:
            minmax(0, 1.35fr)
            minmax(270px, .65fr);
          gap: 20px;
          align-items: start;
        }

        .stockify-summary-panel {
          min-width: 0;
          overflow: hidden;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, .035);
        }

        .stockify-summary-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 18px 20px;
          border-bottom: 1px solid #eceef1;
        }

        .stockify-summary-panel-title {
          margin: 0;
          color: #202124;
          font-size: 16px;
          font-weight: 600;
        }

        .stockify-summary-panel-meta {
          color: #8a9099;
          font-size: 10px;
          white-space: nowrap;
        }

        .stockify-summary-equity-body {
          padding: 22px 20px;
        }

        .stockify-summary-equity-main {
          display: grid;
          grid-template-columns:
            minmax(0, 1fr)
            minmax(220px, .8fr);
          gap: 28px;
          align-items: center;
        }

        .stockify-summary-label {
          margin: 0 0 7px;
          color: #737983;
          font-size: 11px;
        }

        .stockify-summary-big-value {
          margin: 0;
          color: #202124;
          font-size: 36px;
          font-weight: 500;
          line-height: 1.15;
        }

        .stockify-summary-stat-list {
          display: grid;
          gap: 13px;
          padding-left: 24px;
          border-left: 1px solid #e5e7eb;
        }

        .stockify-summary-stat {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          color: #8a9099;
          font-size: 11px;
        }

        .stockify-summary-stat strong {
          color: #30343b;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
        }

        .stockify-summary-meter {
          margin-top: 24px;
        }

        .stockify-summary-meter-header {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 7px;
          color: #8a9099;
          font-size: 10px;
        }

        .stockify-summary-meter-header strong {
          color: #30343b;
        }

        .stockify-summary-meter-track {
          width: 100%;
          height: 6px;
          overflow: hidden;
          border-radius: 10px;
          background: #edf0f3;
        }

        .stockify-summary-meter-fill {
          height: 100%;
          border-radius: inherit;
          background: #387ed1;
        }

        .stockify-summary-pnl-section {
          padding: 20px;
          border-top: 1px solid #eceef1;
        }

        .stockify-summary-pnl-label {
          margin: 0 0 6px;
          color: #737983;
          font-size: 11px;
        }

        .stockify-summary-pnl-value {
          margin: 0;
          font-size: 30px;
          font-weight: 500;
          line-height: 1.2;
        }

        .stockify-summary-pnl-value.profit {
          color: #2e7d32;
        }

        .stockify-summary-pnl-value.loss {
          color: #d14343;
        }

        .stockify-summary-pnl-percent {
          margin-left: 7px;
          font-size: 12px;
          font-weight: 600;
        }

        .stockify-summary-holding-row {
          display: grid;
          grid-template-columns:
            minmax(100px, 1fr)
            auto
            auto;
          align-items: center;
          gap: 14px;
          min-height: 52px;
          padding: 0 20px;
          border-bottom: 1px solid #f0f1f2;
        }

        .stockify-summary-holding-row:last-child {
          border-bottom: 0;
        }

        .stockify-summary-holding-name {
          min-width: 0;
          overflow: hidden;
          color: #30343b;
          font-size: 11px;
          font-weight: 600;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .stockify-summary-holding-qty {
          color: #8a9099;
          font-size: 10px;
          white-space: nowrap;
        }

        .stockify-summary-holding-value {
          color: #30343b;
          font-size: 11px;
          font-weight: 600;
          text-align: right;
          white-space: nowrap;
        }

        .stockify-summary-overview-body {
          padding: 18px 20px;
        }

        .stockify-summary-overview-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          min-height: 43px;
          border-bottom: 1px solid #f0f1f2;
          color: #737983;
          font-size: 11px;
        }

        .stockify-summary-overview-row:last-of-type {
          border-bottom: 0;
        }

        .stockify-summary-overview-row strong {
          color: #30343b;
          font-size: 12px;
          font-weight: 600;
          text-align: right;
          white-space: nowrap;
        }

        .stockify-summary-overview-row strong.profit {
          color: #2e7d32;
        }

        .stockify-summary-overview-row strong.loss {
          color: #d14343;
        }

        .stockify-summary-note {
          margin-top: 16px;
          padding: 11px 12px;
          border-radius: 7px;
          background: #f7f9fb;
          color: #8a9099;
          font-size: 10px;
          line-height: 1.5;
        }

        @media (max-width: 1000px) {
          .stockify-summary-panels {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 760px) {
          .stockify-summary-page {
            padding: 24px 18px 40px;
          }

          .stockify-summary-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .stockify-summary-header-actions {
            width: 100%;
            justify-content: space-between;
          }

          .stockify-summary-cards {
            grid-template-columns: 1fr;
          }

          .stockify-summary-equity-main {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .stockify-summary-stat-list {
            padding: 16px 0 0;
            border-top: 1px solid #e5e7eb;
            border-left: 0;
          }
        }

        @media (max-width: 480px) {
          .stockify-summary-page {
            padding: 20px 13px 32px;
          }

          .stockify-summary-title {
            font-size: 24px;
          }

          .stockify-summary-big-value {
            font-size: 30px;
          }

          .stockify-summary-pnl-value {
            font-size: 26px;
          }

          .stockify-summary-panel-header,
          .stockify-summary-equity-body,
          .stockify-summary-pnl-section,
          .stockify-summary-overview-body {
            padding-left: 16px;
            padding-right: 16px;
          }

          .stockify-summary-holding-row {
            grid-template-columns:
              minmax(80px, 1fr)
              auto;
            gap: 8px;
            padding: 0 16px;
          }

          .stockify-summary-holding-qty {
            display: none;
          }

          .stockify-summary-account-badge {
            align-self: flex-start;
          }

          .stockify-summary-header-actions {
            align-items: center;
          }
        }
      `}</style>

      {/* HEADER */}
      <header className="stockify-summary-header">
        <div className="stockify-summary-header-copy">
          <p className="stockify-summary-eyebrow">
            DASHBOARD
          </p>

          <h1 className="stockify-summary-title">
            Hi, {userName}!
          </h1>

          <p className="stockify-summary-subtitle">
            Here's a quick overview of your Stockify portfolio.
          </p>
        </div>

        <div className="stockify-summary-header-actions">
          <span className="stockify-summary-account-badge">
            <span className="stockify-summary-account-dot" />
            ACCOUNT ACTIVE
          </span>

          <button
            type="button"
            className="stockify-summary-logout-button"
            onClick={handleLogout}
          >
            LOGOUT
          </button>
        </div>
      </header>

      {/* SUMMARY CARDS */}
      <section className="stockify-summary-cards">
        <div className="stockify-summary-card primary">
          <span className="stockify-summary-card-label">
            Margin available
          </span>

          <h2 className="stockify-summary-card-value">
            {formatCompactCurrency(marginAvailable)}
          </h2>

          <small className="stockify-summary-card-note">
            Available for new trades
          </small>
        </div>

        <div className="stockify-summary-card">
          <span className="stockify-summary-card-label">
            Current value
          </span>

          <h2 className="stockify-summary-card-value">
            {formatCompactCurrency(currentValue)}
          </h2>

          <small className="stockify-summary-card-note">
            Total market value
          </small>
        </div>

        <div className="stockify-summary-card">
          <span className="stockify-summary-card-label">
            Portfolio P&amp;L
          </span>

          <h2 className="stockify-summary-card-value">
            {pnl >= 0 ? "+" : "-"}
            {formatCompactCurrency(Math.abs(pnl))}
          </h2>

          <small
            className={`stockify-summary-card-note ${
              pnl >= 0 ? "profit" : "loss"
            }`}
          >
            {pnl >= 0 ? "+" : ""}
            {pnlPercent.toFixed(2)}% return
          </small>
        </div>
      </section>

      {/* MAIN PANELS */}
      <section className="stockify-summary-panels">
        {/* EQUITY PANEL */}
        <div className="stockify-summary-panel">
          <div className="stockify-summary-panel-header">
            <h2 className="stockify-summary-panel-title">
              Equity
            </h2>

            <span className="stockify-summary-panel-meta">
              Trading funds
            </span>
          </div>

          <div className="stockify-summary-equity-body">
            <div className="stockify-summary-equity-main">
              <div>
                <p className="stockify-summary-label">
                  Margin available
                </p>

                <h3 className="stockify-summary-big-value">
                  {formatCurrency(marginAvailable)}
                </h3>
              </div>

              <div className="stockify-summary-stat-list">
                <div className="stockify-summary-stat">
                  <span>Margins used</span>

                  <strong>
                    {formatCurrency(marginUsed)}
                  </strong>
                </div>

                <div className="stockify-summary-stat">
                  <span>Opening balance</span>

                  <strong>
                    {formatCurrency(openingBalance)}
                  </strong>
                </div>

                <div className="stockify-summary-stat">
                  <span>Available cash</span>

                  <strong>
                    {formatCurrency(marginAvailable)}
                  </strong>
                </div>
              </div>
            </div>

            <div className="stockify-summary-meter">
              <div className="stockify-summary-meter-header">
                <span>Margin utilization</span>

                <strong>
                  {utilization.toFixed(1)}%
                </strong>
              </div>

              <div className="stockify-summary-meter-track">
                <div
                  className="stockify-summary-meter-fill"
                  style={{
                    width: `${utilization}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* P&L */}
          <div className="stockify-summary-pnl-section">
            <p className="stockify-summary-pnl-label">
              Total portfolio P&amp;L
            </p>

            <h3
              className={`stockify-summary-pnl-value ${
                pnl >= 0 ? "profit" : "loss"
              }`}
            >
              {pnl >= 0 ? "+" : "-"}
              {formatCompactCurrency(Math.abs(pnl))}

              <span className="stockify-summary-pnl-percent">
                ({pnl >= 0 ? "+" : ""}
                {pnlPercent.toFixed(2)}%)
              </span>
            </h3>
          </div>

          {/* HOLDINGS HEADER */}
          <div className="stockify-summary-panel-header">
            <h2 className="stockify-summary-panel-title">
              Top holdings
            </h2>

            <span className="stockify-summary-panel-meta">
              {portfolio.length} holdings
            </span>
          </div>

          {/* HOLDINGS LIST */}
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
            }}
          >
            {[...portfolio]
              .sort(
                (a, b) =>
                  b.currentValue - a.currentValue
              )
              .slice(0, 5)
              .map((stock, index) => (
                <li
                  className="stockify-summary-holding-row"
                  key={`${stock.name || "holding"}-${index}`}
                >
                  <span className="stockify-summary-holding-name">
                    {stock.name || "Unknown"}
                  </span>

                  <span className="stockify-summary-holding-qty">
                    Qty {stock.qty}
                  </span>

                  <span className="stockify-summary-holding-value">
                    {formatCurrency(stock.currentValue)}
                  </span>
                </li>
              ))}

            {portfolio.length === 0 && (
              <li className="stockify-summary-holding-row">
                <span className="stockify-summary-holding-name">
                  No holdings available
                </span>
              </li>
            )}
          </ul>
        </div>

        {/* PORTFOLIO OVERVIEW */}
        <aside className="stockify-summary-panel">
          <div className="stockify-summary-panel-header">
            <h2 className="stockify-summary-panel-title">
              Portfolio overview
            </h2>
          </div>

          <div className="stockify-summary-overview-body">
            <div className="stockify-summary-overview-row">
              <span>Investment</span>

              <strong>
                {formatCurrency(totalInvestment)}
              </strong>
            </div>

            <div className="stockify-summary-overview-row">
              <span>Current value</span>

              <strong>
                {formatCurrency(currentValue)}
              </strong>
            </div>

            <div className="stockify-summary-overview-row">
              <span>Profit / Loss</span>

              <strong
                className={
                  pnl >= 0 ? "profit" : "loss"
                }
              >
                {pnl >= 0 ? "+" : "-"}
                {formatCurrency(Math.abs(pnl))}
              </strong>
            </div>

            <div className="stockify-summary-overview-row">
              <span>Return</span>

              <strong
                className={
                  pnl >= 0 ? "profit" : "loss"
                }
              >
                {pnl >= 0 ? "+" : ""}
                {pnlPercent.toFixed(2)}%
              </strong>
            </div>

            <div className="stockify-summary-overview-row">
              <span>Total holdings</span>

              <strong>
                {portfolio.length}
              </strong>
            </div>

            <div className="stockify-summary-note">
              Your account balance is loaded from your
              Stockify user account.
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default Summary;