import React from "react";
import { positions } from "../data/data";

const formatCurrency = (value) =>
  `₹${Number(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const Positions = () => {
  const totals = positions.reduce(
    (acc, stock) => {
      const qty = Number(stock.qty || 0);
      const avg = Number(stock.avg || 0);
      const price = Number(stock.price || 0);

      const invested = avg * qty;
      const current = price * qty;
      const pnl = current - invested;

      acc.invested += invested;
      acc.current += current;
      acc.pnl += pnl;

      return acc;
    },
    {
      invested: 0,
      current: 0,
      pnl: 0,
    }
  );

  const totalPnlPercent =
    totals.invested > 0
      ? (totals.pnl / totals.invested) * 100
      : 0;

  const isOverallProfit = totals.pnl >= 0;

  return (
    <>
      <style>{`
        .stockify-positions-page {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          padding: 32px 36px 50px;
          box-sizing: border-box;
          color: #202124;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Arial, sans-serif;
        }

        .stockify-positions-page * {
          box-sizing: border-box;
        }

        .stockify-positions-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 24px;
        }

        .stockify-positions-kicker {
          margin: 0 0 7px;
          color: #8a9099;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .14em;
        }

        .stockify-positions-title {
          margin: 0;
          color: #202124;
          font-size: 28px;
          font-weight: 500;
          line-height: 1.2;
        }

        .stockify-positions-subtitle {
          margin: 7px 0 0;
          color: #737983;
          font-size: 13px;
          line-height: 1.5;
        }

        .stockify-positions-status {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 11px;
          border-radius: 20px;
          background: #eef8f0;
          color: #2e7d32;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .06em;
          white-space: nowrap;
        }

        .stockify-positions-status.loss {
          background: #fff1f1;
          color: #d14343;
        }

        .stockify-positions-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
        }

        .stockify-positions-summary {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 24px;
        }

        .stockify-positions-summary-card {
          min-width: 0;
          min-height: 112px;
          padding: 18px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, .035);
        }

        .stockify-positions-summary-card.profit {
          border-color: #d8e9dc;
        }

        .stockify-positions-summary-card.loss {
          border-color: #f0d8d8;
        }

        .stockify-positions-summary-label {
          display: block;
          margin-bottom: 8px;
          color: #737983;
          font-size: 11px;
        }

        .stockify-positions-summary-value {
          margin: 0;
          color: #202124;
          font-size: 21px;
          font-weight: 600;
          line-height: 1.25;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .stockify-positions-summary-card.profit
        .stockify-positions-summary-value {
          color: #2e7d32;
        }

        .stockify-positions-summary-card.loss
        .stockify-positions-summary-value {
          color: #d14343;
        }

        .stockify-positions-summary-note {
          display: block;
          margin-top: 7px;
          color: #8a9099;
          font-size: 10px;
        }

        .stockify-positions-card {
          width: 100%;
          min-width: 0;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, .035);
          overflow: hidden;
        }

        .stockify-positions-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 20px 22px;
          border-bottom: 1px solid #eceef1;
        }

        .stockify-positions-card-heading {
          margin: 0;
          color: #202124;
          font-size: 16px;
          font-weight: 600;
        }

        .stockify-positions-count {
          color: #8a9099;
          font-size: 11px;
        }

        .stockify-positions-table-wrap {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .stockify-positions-table {
          width: 100%;
          min-width: 760px;
          border-collapse: collapse;
          table-layout: fixed;
        }

        .stockify-positions-table th {
          height: 44px;
          padding: 0 18px;
          border-bottom: 1px solid #eceef1;
          background: #fafafa;
          color: #8a9099;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .04em;
          text-align: right;
          white-space: nowrap;
        }

        .stockify-positions-table th:first-child,
        .stockify-positions-table th:nth-child(2) {
          text-align: left;
        }

        .stockify-positions-table td {
          height: 58px;
          padding: 0 18px;
          border-bottom: 1px solid #f0f1f2;
          color: #30343b;
          font-size: 12px;
          text-align: right;
          white-space: nowrap;
        }

        .stockify-positions-table tbody tr:last-child td {
          border-bottom: 0;
        }

        .stockify-positions-table tbody tr:hover {
          background: #fafbfd;
        }

        .stockify-positions-table td:first-child,
        .stockify-positions-table td:nth-child(2) {
          text-align: left;
        }

        .stockify-positions-product {
          display: inline-flex;
          align-items: center;
          padding: 4px 7px;
          border-radius: 4px;
          background: #f3f5f7;
          color: #555b64;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .05em;
        }

        .stockify-positions-instrument {
          color: #202124;
          font-weight: 600;
        }

        .stockify-positions-qty {
          font-weight: 500;
        }

        .stockify-positions-pnl {
          font-weight: 600;
        }

        .stockify-positions-pnl.profit,
        .stockify-positions-change.profit {
          color: #2e7d32;
        }

        .stockify-positions-pnl.loss,
        .stockify-positions-change.loss {
          color: #d14343;
        }

        .stockify-positions-empty {
          padding: 55px 20px;
          color: #8a9099;
          font-size: 13px;
          text-align: center;
        }

        .stockify-positions-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 15px 22px;
          border-top: 1px solid #eceef1;
          background: #fafafa;
          color: #737983;
          font-size: 11px;
        }

        .stockify-positions-footer strong {
          color: #30343b;
          font-weight: 600;
        }

        @media (max-width: 950px) {
          .stockify-positions-summary {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 650px) {
          .stockify-positions-page {
            padding: 22px 14px 35px;
          }

          .stockify-positions-header {
            align-items: flex-start;
            flex-direction: column;
            margin-bottom: 20px;
          }

          .stockify-positions-title {
            font-size: 25px;
          }

          .stockify-positions-summary {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .stockify-positions-summary-card {
            min-height: 100px;
          }

          .stockify-positions-card-header {
            padding: 17px;
          }

          .stockify-positions-table th,
          .stockify-positions-table td {
            padding-left: 14px;
            padding-right: 14px;
          }

          .stockify-positions-footer {
            align-items: flex-start;
            flex-direction: column;
            gap: 6px;
            padding: 14px 17px;
          }
        }
      `}</style>

      <main className="stockify-positions-page">

        {/* Header */}
        <header className="stockify-positions-header">
          <div>
            <p className="stockify-positions-kicker">
              TRADING
            </p>

            <h1 className="stockify-positions-title">
              Positions ({positions.length})
            </h1>

            <p className="stockify-positions-subtitle">
              Track your active trades, current value, and profit or loss.
            </p>
          </div>

          <div
            className={`stockify-positions-status ${
              isOverallProfit ? "" : "loss"
            }`}
          >
            <span className="stockify-positions-status-dot" />

            {isOverallProfit
              ? "OVERALL PROFIT"
              : "OVERALL LOSS"}
          </div>
        </header>

        {/* Summary */}
        <section className="stockify-positions-summary">

          <div className="stockify-positions-summary-card">
            <span className="stockify-positions-summary-label">
              Invested value
            </span>

            <h2 className="stockify-positions-summary-value">
              {formatCurrency(totals.invested)}
            </h2>

            <small className="stockify-positions-summary-note">
              Total position cost
            </small>
          </div>

          <div className="stockify-positions-summary-card">
            <span className="stockify-positions-summary-label">
              Current value
            </span>

            <h2 className="stockify-positions-summary-value">
              {formatCurrency(totals.current)}
            </h2>

            <small className="stockify-positions-summary-note">
              Current market value
            </small>
          </div>

          <div
            className={`stockify-positions-summary-card ${
              isOverallProfit ? "profit" : "loss"
            }`}
          >
            <span className="stockify-positions-summary-label">
              Total P&amp;L
            </span>

            <h2 className="stockify-positions-summary-value">
              {isOverallProfit ? "+" : ""}
              {formatCurrency(totals.pnl)}
            </h2>

            <small className="stockify-positions-summary-note">
              {isOverallProfit ? "+" : ""}
              {totalPnlPercent.toFixed(2)}% overall
            </small>
          </div>

          <div className="stockify-positions-summary-card">
            <span className="stockify-positions-summary-label">
              Active positions
            </span>

            <h2 className="stockify-positions-summary-value">
              {positions.length}
            </h2>

            <small className="stockify-positions-summary-note">
              Open positions
            </small>
          </div>

        </section>

        {/* Positions Table */}
        <section className="stockify-positions-card">

          <div className="stockify-positions-card-header">
            <h2 className="stockify-positions-card-heading">
              Open positions
            </h2>

            <span className="stockify-positions-count">
              {positions.length} instrument
              {positions.length === 1 ? "" : "s"}
            </span>
          </div>

          {positions.length === 0 ? (
            <div className="stockify-positions-empty">
              No open positions at the moment.
            </div>
          ) : (
            <div className="stockify-positions-table-wrap">

              <table className="stockify-positions-table">

                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>INSTRUMENT</th>
                    <th>QTY.</th>
                    <th>AVG.</th>
                    <th>LTP</th>
                    <th>P&amp;L</th>
                    <th>CHG.</th>
                  </tr>
                </thead>

                <tbody>
                  {positions.map((stock, index) => {
                    const qty = Number(stock.qty || 0);
                    const avg = Number(stock.avg || 0);
                    const price = Number(stock.price || 0);

                    const investedValue = avg * qty;
                    const currentValue = price * qty;

                    const pnl =
                      currentValue - investedValue;

                    const isProfit = pnl >= 0;

                    const pnlPercent =
                      investedValue > 0
                        ? (pnl / investedValue) * 100
                        : 0;

                    const dayChange =
                      String(stock.day || "0%");

                    const dayIsLoss =
                      stock.isLoss ||
                      dayChange.trim().startsWith("-");

                    return (
                      <tr
                        key={`${stock.name}-${index}`}
                      >
                        <td>
                          <span className="stockify-positions-product">
                            {stock.product}
                          </span>
                        </td>

                        <td>
                          <span className="stockify-positions-instrument">
                            {stock.name}
                          </span>
                        </td>

                        <td>
                          <span className="stockify-positions-qty">
                            {qty}
                          </span>
                        </td>

                        <td>
                          {formatCurrency(avg)}
                        </td>

                        <td>
                          {formatCurrency(price)}
                        </td>

                        <td>
                          <span
                            className={`stockify-positions-pnl ${
                              isProfit
                                ? "profit"
                                : "loss"
                            }`}
                          >
                            {isProfit ? "+" : ""}
                            {formatCurrency(pnl)}

                            <br />

                            <small
                              style={{
                                fontWeight: 400,
                              }}
                            >
                              {isProfit ? "+" : ""}
                              {pnlPercent.toFixed(2)}%
                            </small>
                          </span>
                        </td>

                        <td>
                          <span
                            className={`stockify-positions-change ${
                              dayIsLoss
                                ? "loss"
                                : "profit"
                            }`}
                          >
                            {dayChange}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>
          )}

          {positions.length > 0 && (
            <div className="stockify-positions-footer">

              <span>
                Current position value:{" "}
                <strong>
                  {formatCurrency(totals.current)}
                </strong>
              </span>

              <span>
                Overall P&amp;L:{" "}
                <strong>
                  {isOverallProfit ? "+" : ""}
                  {formatCurrency(totals.pnl)}
                </strong>
              </span>

            </div>
          )}

        </section>

      </main>
    </>
  );
};

export default Positions;