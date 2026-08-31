import React,{useState , useEffect , useMemo } from "react";
import { VerticalGraph } from "./VerticalGraph";
import { holdings } from "../data/data";
import axios from "axios";

const formatCurrency = (value) =>
  `₹${Number(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatSignedCurrency = (value) => {
  const number = Number(value) || 0;

  if (number > 0) return `+${formatCurrency(number)}`;
  if (number < 0) return `-${formatCurrency(Math.abs(number))}`;

  return formatCurrency(0);
};

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/allholdings")
      .then((response) => {
        console.log("Holdings fetched:", response.data.data);
        setHoldings(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching holdings:", error);
      }); 
  }, []);




  const portfolio = useMemo(() => {
    return holdings.map((stock) => {
      const qty = Number(stock.qty || 0);
      const avg = Number(stock.avg || 0);
      const price = Number(stock.price || 0);

      const investment = avg * qty;
      const currentValue = price * qty;
      const pnl = currentValue - investment;

      const pnlPercent =
        investment > 0 ? (pnl / investment) * 100 : 0;

      const dayValue =
        parseFloat(String(stock.day || "0").replace("%", "")) || 0;

      const netValue =
        parseFloat(String(stock.net || "0").replace("%", "")) || 0;

      return {
        ...stock,
        qty,
        avg,
        price,
        investment,
        currentValue,
        pnl,
        pnlPercent,
        dayValue,
        netValue,
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

  const totalPnl = currentValue - totalInvestment;

  const totalPnlPercent =
    totalInvestment > 0
      ? (totalPnl / totalInvestment) * 100
      : 0;

  const totalDayChange = portfolio.reduce(
    (total, stock) => total + stock.dayValue,
    0
  );

  const profitableHoldings = portfolio.filter(
    (stock) => stock.pnl > 0
  ).length;

  const losingHoldings = portfolio.filter(
    (stock) => stock.pnl < 0
  ).length;

  const isProfit = totalPnl > 0;
  const isLoss = totalPnl < 0;

  const labels = portfolio.map((stock) => stock.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Current Stock Value",
        data: portfolio.map((stock) => stock.currentValue),
        backgroundColor: "rgba(56, 126, 209, 0.55)",
        borderColor: "rgba(56, 126, 209, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <style>{`
        .stockify-holdings-page {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          padding: 32px 36px 50px;
          box-sizing: border-box;
          color: #202124;
          font-family: -apple-system, BlinkMacSystemFont,
            "Segoe UI", Roboto, Arial, sans-serif;
        }

        .stockify-holdings-page * {
          box-sizing: border-box;
        }

        .stockify-holdings-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 24px;
        }

        .stockify-holdings-kicker {
          margin: 0 0 7px;
          color: #8a9099;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .14em;
        }

        .stockify-holdings-title {
          margin: 0;
          color: #202124;
          font-size: 28px;
          font-weight: 500;
          line-height: 1.2;
        }

        .stockify-holdings-subtitle {
          margin: 7px 0 0;
          color: #737983;
          font-size: 13px;
          line-height: 1.5;
        }

        .stockify-holdings-status {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 11px;
          border-radius: 20px;
          background: #f2f4f6;
          color: #737983;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .06em;
          white-space: nowrap;
        }

        .stockify-holdings-status.profit {
          background: #eef8f0;
          color: #2e7d32;
        }

        .stockify-holdings-status.loss {
          background: #fff1f1;
          color: #d14343;
        }

        .stockify-holdings-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
        }

        .stockify-holdings-summary {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 24px;
        }

        .stockify-holdings-summary-card {
          min-width: 0;
          min-height: 112px;
          padding: 18px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, .035);
        }

        .stockify-holdings-summary-card.profit {
          border-color: #d8e9dc;
        }

        .stockify-holdings-summary-card.loss {
          border-color: #f0d8d8;
        }

        .stockify-holdings-summary-label {
          display: block;
          margin-bottom: 8px;
          color: #737983;
          font-size: 11px;
        }

        .stockify-holdings-summary-value {
          margin: 0;
          color: #202124;
          font-size: 21px;
          font-weight: 600;
          line-height: 1.25;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .stockify-holdings-summary-card.profit
        .stockify-holdings-summary-value {
          color: #2e7d32;
        }

        .stockify-holdings-summary-card.loss
        .stockify-holdings-summary-value {
          color: #d14343;
        }

        .stockify-holdings-summary-note {
          display: block;
          margin-top: 7px;
          color: #8a9099;
          font-size: 10px;
        }

        .stockify-holdings-card {
          width: 100%;
          min-width: 0;
          margin-bottom: 24px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, .035);
          overflow: hidden;
        }

        .stockify-holdings-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 20px 22px;
          border-bottom: 1px solid #eceef1;
        }

        .stockify-holdings-card-heading {
          margin: 0;
          color: #202124;
          font-size: 16px;
          font-weight: 600;
        }

        .stockify-holdings-card-count {
          color: #8a9099;
          font-size: 11px;
        }

        .stockify-holdings-table-wrap {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .stockify-holdings-table {
          width: 100%;
          min-width: 900px;
          border-collapse: collapse;
          table-layout: fixed;
        }

        .stockify-holdings-table th {
          height: 44px;
          padding: 0 16px;
          border-bottom: 1px solid #eceef1;
          background: #fafafa;
          color: #8a9099;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .04em;
          text-align: right;
          white-space: nowrap;
        }

        .stockify-holdings-table th:first-child {
          text-align: left;
        }

        .stockify-holdings-table td {
          height: 58px;
          padding: 0 16px;
          border-bottom: 1px solid #f0f1f2;
          color: #30343b;
          font-size: 12px;
          text-align: right;
          white-space: nowrap;
        }

        .stockify-holdings-table tbody tr:last-child td {
          border-bottom: 0;
        }

        .stockify-holdings-table tbody tr:hover {
          background: #fafbfd;
        }

        .stockify-holdings-table td:first-child {
          text-align: left;
        }

        .stockify-holdings-instrument {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: #202124;
          font-weight: 600;
        }

        .stockify-holdings-instrument-dot {
          width: 7px;
          height: 7px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #387ed1;
        }

        .stockify-holdings-pnl.profit,
        .stockify-holdings-change.profit {
          color: #2e7d32;
          font-weight: 600;
        }

        .stockify-holdings-pnl.loss,
        .stockify-holdings-change.loss {
          color: #d14343;
          font-weight: 600;
        }

        .stockify-holdings-pnl small {
          display: block;
          margin-top: 2px;
          font-size: 10px;
          font-weight: 400;
        }

        .stockify-holdings-empty {
          padding: 60px 20px;
          color: #8a9099;
          font-size: 13px;
          text-align: center;
        }

        .stockify-holdings-table-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 14px 22px;
          border-top: 1px solid #eceef1;
          background: #fafafa;
          color: #737983;
          font-size: 11px;
        }

        .stockify-holdings-table-footer strong {
          color: #30343b;
          font-weight: 600;
        }

        .stockify-holdings-bottom {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(260px, .35fr);
          gap: 24px;
          align-items: stretch;
        }

        .stockify-holdings-chart-card {
          min-width: 0;
          padding: 22px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, .035);
          overflow: hidden;
        }

        .stockify-holdings-chart-header {
          margin-bottom: 18px;
        }

        .stockify-holdings-chart-title {
          margin: 0;
          color: #202124;
          font-size: 16px;
          font-weight: 600;
        }

        .stockify-holdings-chart-subtitle {
          margin: 5px 0 0;
          color: #8a9099;
          font-size: 11px;
        }

        .stockify-holdings-chart {
          width: 100%;
          min-height: 280px;
        }

        .stockify-holdings-health-card {
          min-width: 0;
          padding: 22px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, .035);
        }

        .stockify-holdings-health-title {
          margin: 0 0 18px;
          color: #202124;
          font-size: 16px;
          font-weight: 600;
        }

        .stockify-holdings-health-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          min-height: 40px;
          border-bottom: 1px solid #f0f1f2;
          color: #737983;
          font-size: 12px;
        }

        .stockify-holdings-health-row:last-child {
          border-bottom: 0;
        }

        .stockify-holdings-health-row strong {
          color: #30343b;
          font-weight: 600;
        }

        .stockify-holdings-health-row strong.profit {
          color: #2e7d32;
        }

        .stockify-holdings-health-row strong.loss {
          color: #d14343;
        }

        @media (max-width: 1000px) {
          .stockify-holdings-summary {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .stockify-holdings-bottom {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 650px) {
          .stockify-holdings-page {
            padding: 22px 14px 35px;
          }

          .stockify-holdings-header {
            align-items: flex-start;
            flex-direction: column;
            margin-bottom: 20px;
          }

          .stockify-holdings-title {
            font-size: 25px;
          }

          .stockify-holdings-summary {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .stockify-holdings-summary-card {
            min-height: 100px;
          }

          .stockify-holdings-card-header {
            padding: 17px;
          }

          .stockify-holdings-table th,
          .stockify-holdings-table td {
            padding-left: 13px;
            padding-right: 13px;
          }

          .stockify-holdings-table-footer {
            align-items: flex-start;
            flex-direction: column;
            gap: 6px;
            padding: 14px 17px;
          }

          .stockify-holdings-chart-card,
          .stockify-holdings-health-card {
            padding: 17px;
          }
        }
      `}</style>

      <main className="stockify-holdings-page">

        {/* Header */}
        <header className="stockify-holdings-header">
          <div>
            <p className="stockify-holdings-kicker">
              PORTFOLIO
            </p>

            <h1 className="stockify-holdings-title">
              Holdings ({portfolio.length})
            </h1>

            <p className="stockify-holdings-subtitle">
              Track your investments, market value, and portfolio performance.
            </p>
          </div>

          <div
            className={`stockify-holdings-status ${
              isProfit
                ? "profit"
                : isLoss
                ? "loss"
                : ""
            }`}
          >
            <span className="stockify-holdings-status-dot" />

            {isProfit
              ? "PORTFOLIO PROFIT"
              : isLoss
              ? "PORTFOLIO LOSS"
              : "NO CHANGE"}
          </div>
        </header>

        {/* Summary */}
        <section className="stockify-holdings-summary">

          <div className="stockify-holdings-summary-card">
            <span className="stockify-holdings-summary-label">
              Total investment
            </span>

            <h2 className="stockify-holdings-summary-value">
              {formatCurrency(totalInvestment)}
            </h2>

            <small className="stockify-holdings-summary-note">
              Amount invested
            </small>
          </div>

          <div className="stockify-holdings-summary-card">
            <span className="stockify-holdings-summary-label">
              Current value
            </span>

            <h2 className="stockify-holdings-summary-value">
              {formatCurrency(currentValue)}
            </h2>

            <small className="stockify-holdings-summary-note">
              Current market value
            </small>
          </div>

          <div
            className={`stockify-holdings-summary-card ${
              isProfit
                ? "profit"
                : isLoss
                ? "loss"
                : ""
            }`}
          >
            <span className="stockify-holdings-summary-label">
              Total P&amp;L
            </span>

            <h2 className="stockify-holdings-summary-value">
              {formatSignedCurrency(totalPnl)}
            </h2>

            <small className="stockify-holdings-summary-note">
              {totalPnlPercent >= 0 ? "+" : ""}
              {totalPnlPercent.toFixed(2)}% return
            </small>
          </div>

          <div className="stockify-holdings-summary-card">
            <span className="stockify-holdings-summary-label">
              Today's change
            </span>

            <h2
              className="stockify-holdings-summary-value"
              style={{
                color:
                  totalDayChange >= 0
                    ? "#2e7d32"
                    : "#d14343",
              }}
            >
              {totalDayChange >= 0 ? "+" : ""}
              {totalDayChange.toFixed(2)}%
            </h2>

            <small className="stockify-holdings-summary-note">
              Combined day movement
            </small>
          </div>

        </section>

        {/* Holdings Table */}
        <section className="stockify-holdings-card">

          <div className="stockify-holdings-card-header">

            <h2 className="stockify-holdings-card-heading">
              Your holdings
            </h2>

            <span className="stockify-holdings-card-count">
              {profitableHoldings} profitable ·{" "}
              {losingHoldings} losing
            </span>

          </div>

          {portfolio.length === 0 ? (
            <div className="stockify-holdings-empty">
              No holdings in your portfolio.
            </div>
          ) : (
            <div className="stockify-holdings-table-wrap">

              <table className="stockify-holdings-table">

                <thead>
                  <tr>
                    <th>INSTRUMENT</th>
                    <th>QTY.</th>
                    <th>AVG. COST</th>
                    <th>LTP</th>
                    <th>CUR. VAL</th>
                    <th>P&amp;L</th>
                    <th>NET CHG.</th>
                    <th>DAY CHG.</th>
                  </tr>
                </thead>

                <tbody>

                  {portfolio.map((stock) => (
                    <tr key={stock.name}>

                      <td>
                        <span className="stockify-holdings-instrument">

                          <span className="stockify-holdings-instrument-dot" />

                          {stock.name}

                        </span>
                      </td>

                      <td>
                        {stock.qty}
                      </td>

                      <td>
                        {formatCurrency(stock.avg)}
                      </td>

                      <td>
                        {formatCurrency(stock.price)}
                      </td>

                      <td>
                        {formatCurrency(stock.currentValue)}
                      </td>

                      <td>

                        <span
                          className={`stockify-holdings-pnl ${
                            stock.pnl >= 0
                              ? "profit"
                              : "loss"
                          }`}
                        >

                          {formatSignedCurrency(stock.pnl)}

                          <small>
                            {stock.pnlPercent >= 0
                              ? "+"
                              : ""}
                            {stock.pnlPercent.toFixed(2)}%
                          </small>

                        </span>

                      </td>

                      <td>

                        <span
                          className={`stockify-holdings-change ${
                            stock.netValue >= 0
                              ? "profit"
                              : "loss"
                          }`}
                        >
                          {stock.netValue >= 0
                            ? "+"
                            : ""}
                          {stock.net} 
                        </span>

                      </td>

                      <td>

                        <span
                          className={`stockify-holdings-change ${
                            stock.dayValue >= 0
                              ? "profit"
                              : "loss"
                          }`}
                        >
                          {stock.dayValue >= 0
                            ? "+"
                            : ""}
                          {Math.abs(
                            stock.dayValue
                          ).toFixed(2)}
                          %
                        </span>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

          {portfolio.length > 0 && (
            <div className="stockify-holdings-table-footer">

              <span>
                Current value:{" "}
                <strong>
                  {formatCurrency(currentValue)}
                </strong>
              </span>

              <span>
                Total P&amp;L:{" "}
                <strong>
                  {formatSignedCurrency(totalPnl)}
                </strong>
              </span>

            </div>
          )}

        </section>

        {/* Chart + Portfolio Overview */}
        <section className="stockify-holdings-bottom">

          <div className="stockify-holdings-chart-card">

            <div className="stockify-holdings-chart-header">

              <h2 className="stockify-holdings-chart-title">
                Portfolio allocation
              </h2>

              <p className="stockify-holdings-chart-subtitle">
                Current market value by instrument
              </p>

            </div>

            <div className="stockify-holdings-chart">
              <VerticalGraph data={data} />
            </div>

          </div>

          <div className="stockify-holdings-health-card">

            <h2 className="stockify-holdings-health-title">
              Portfolio overview
            </h2>

            <div className="stockify-holdings-health-row">
              <span>Holdings</span>
              <strong>{portfolio.length}</strong>
            </div>

            <div className="stockify-holdings-health-row">
              <span>Profitable</span>
              <strong className="profit">
                {profitableHoldings}
              </strong>
            </div>

            <div className="stockify-holdings-health-row">
              <span>In loss</span>
              <strong className="loss">
                {losingHoldings}
              </strong>
            </div>

            <div className="stockify-holdings-health-row">
              <span>Best holding</span>

              <strong>
                {portfolio.length > 0
                  ? portfolio.reduce(
                      (best, stock) =>
                        stock.pnlPercent >
                        best.pnlPercent
                          ? stock
                          : best
                    ).name
                  : "—"}
              </strong>
            </div>

            <div className="stockify-holdings-health-row">
              <span>Overall return</span>

              <strong
                className={
                  isProfit
                    ? "profit"
                    : isLoss
                    ? "loss"
                    : ""
                }
              >
                {totalPnlPercent >= 0
                  ? "+"
                  : ""}
                {totalPnlPercent.toFixed(2)}%
              </strong>
            </div>

          </div>

        </section>

      </main>
    </>
  );
};

export default Holdings;