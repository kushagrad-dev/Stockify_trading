import React, { useContext, useMemo, useState } from "react";
import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
  SearchOutlined,
} from "@mui/icons-material";

import GeneralContext from "./GeneralContext";
import { watchlist } from "../data/data";
import { DoughnutChart } from "./DoughnoutChart";

const chartColors = [
  "rgba(56, 126, 209, 0.55)",
  "rgba(46, 125, 50, 0.55)",
  "rgba(245, 158, 11, 0.55)",
  "rgba(124, 77, 255, 0.55)",
  "rgba(14, 116, 144, 0.55)",
  "rgba(220, 38, 38, 0.55)",
];

const chartBorderColors = [
  "rgba(56, 126, 209, 1)",
  "rgba(46, 125, 50, 1)",
  "rgba(245, 158, 11, 1)",
  "rgba(124, 77, 255, 1)",
  "rgba(14, 116, 144, 1)",
  "rgba(220, 38, 38, 1)",
];

const WatchList = () => {
  const [search, setSearch] = useState("");

  const filteredStocks = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return watchlist;

    return watchlist.filter((stock) =>
      String(stock.name).toLowerCase().includes(query)
    );
  }, [search]);

  const data = {
    labels: watchlist.map((stock) => stock.name),
    datasets: [
      {
        label: "Price",
        data: watchlist.map((stock) => Number(stock.price) || 0),
        backgroundColor: watchlist.map(
          (_, index) => chartColors[index % chartColors.length]
        ),
        borderColor: watchlist.map(
          (_, index) =>
            chartBorderColors[index % chartBorderColors.length]
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <style>{`
        .stockify-watchlist-page {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          padding: 28px 30px 45px;
          box-sizing: border-box;
          color: #202124;
          font-family: -apple-system, BlinkMacSystemFont,
            "Segoe UI", Roboto, Arial, sans-serif;
        }

        .stockify-watchlist-page * {
          box-sizing: border-box;
        }

        .stockify-watchlist-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 20px;
        }

        .stockify-watchlist-kicker {
          margin: 0 0 6px;
          color: #8a9099;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .14em;
        }

        .stockify-watchlist-title {
          margin: 0;
          color: #202124;
          font-size: 25px;
          font-weight: 500;
          line-height: 1.2;
        }

        .stockify-watchlist-subtitle {
          margin: 6px 0 0;
          color: #737983;
          font-size: 12px;
        }

        .stockify-watchlist-limit {
          flex-shrink: 0;
          padding: 7px 10px;
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          color: #737983;
          background: #fff;
          font-size: 10px;
          font-weight: 600;
        }

        .stockify-watchlist-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(280px, 340px);
          gap: 20px;
          align-items: start;
        }

        .stockify-watchlist-card,
        .stockify-watchlist-chart-card {
          min-width: 0;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, .035);
          overflow: hidden;
        }

        .stockify-watchlist-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 15px 17px;
          border-bottom: 1px solid #eceef1;
        }

        .stockify-watchlist-search {
          position: relative;
          flex: 1;
          min-width: 0;
        }

        .stockify-watchlist-search-icon {
          position: absolute;
          left: 11px;
          top: 50%;
          width: 18px;
          height: 18px;
          transform: translateY(-50%);
          color: #9aa0a6;
          pointer-events: none;
        }

        .stockify-watchlist-input {
          width: 100%;
          height: 38px;
          padding: 0 12px 0 37px;
          border: 1px solid #e1e4e8;
          border-radius: 7px;
          outline: none;
          color: #30343b;
          background: #fafafa;
          font-size: 12px;
          transition: border-color .15s ease,
            background .15s ease;
        }

        .stockify-watchlist-input:focus {
          border-color: #387ed1;
          background: #fff;
        }

        .stockify-watchlist-count {
          flex-shrink: 0;
          color: #8a9099;
          font-size: 11px;
          white-space: nowrap;
        }

        .stockify-watchlist-list {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .stockify-watchlist-row {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 67px;
          gap: 14px;
          padding: 9px 17px;
          border-bottom: 1px solid #f0f1f2;
          background: #fff;
          transition: background .15s ease;
        }

        .stockify-watchlist-row:last-child {
          border-bottom: 0;
        }

        .stockify-watchlist-row:hover {
          background: #fafbfd;
        }

        .stockify-watchlist-stock {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
          flex: 1;
        }

        .stockify-watchlist-symbol {
          width: 31px;
          height: 31px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          border-radius: 7px;
          background: #f1f5f9;
          color: #387ed1;
          font-size: 9px;
          font-weight: 700;
        }

        .stockify-watchlist-name {
          min-width: 0;
          overflow: hidden;
          color: #30343b;
          font-size: 12px;
          font-weight: 600;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .stockify-watchlist-quote {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 6px;
          min-width: 185px;
        }

        .stockify-watchlist-percent {
          font-size: 11px;
          font-weight: 600;
        }

        .stockify-watchlist-percent.up,
        .stockify-watchlist-arrow.up {
          color: #2e7d32;
        }

        .stockify-watchlist-percent.down,
        .stockify-watchlist-arrow.down {
          color: #d14343;
        }

        .stockify-watchlist-arrow {
          width: 18px;
          height: 18px;
        }

        .stockify-watchlist-price {
          min-width: 85px;
          color: #202124;
          font-size: 12px;
          font-weight: 600;
          text-align: right;
        }

        .stockify-watchlist-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 5px;
          min-width: 154px;
        }

        .stockify-watchlist-action-button {
          height: 30px;
          min-width: 34px;
          padding: 0 9px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid transparent;
          border-radius: 5px;
          cursor: pointer;
          font-size: 10px;
          font-weight: 600;
          transition: transform .12s ease,
            opacity .12s ease;
        }

        .stockify-watchlist-action-button:hover {
          transform: translateY(-1px);
          opacity: .9;
        }

        .stockify-watchlist-action-button.buy {
          border-color: #2e7d32;
          background: #2e7d32;
          color: #fff;
        }

        .stockify-watchlist-action-button.sell {
          border-color: #d14343;
          background: #d14343;
          color: #fff;
        }

        .stockify-watchlist-action-button.icon {
          border-color: #e0e3e7;
          background: #fff;
          color: #626873;
        }

        .stockify-watchlist-action-icon {
          width: 17px;
          height: 17px;
        }

        .stockify-watchlist-empty {
          padding: 55px 20px;
          color: #8a9099;
          font-size: 12px;
          text-align: center;
        }

        .stockify-watchlist-chart-card {
          padding: 20px;
        }

        .stockify-watchlist-chart-header {
          margin-bottom: 15px;
        }

        .stockify-watchlist-chart-kicker {
          margin: 0 0 5px;
          color: #8a9099;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .13em;
        }

        .stockify-watchlist-chart-title {
          margin: 0;
          color: #202124;
          font-size: 16px;
          font-weight: 600;
        }

        .stockify-watchlist-chart-subtitle {
          margin: 5px 0 0;
          color: #8a9099;
          font-size: 10px;
          line-height: 1.5;
        }

        .stockify-watchlist-chart {
          width: 100%;
          min-height: 270px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stockify-watchlist-chart-note {
          margin-top: 14px;
          padding-top: 13px;
          border-top: 1px solid #eceef1;
          color: #8a9099;
          font-size: 10px;
          line-height: 1.5;
        }

        @media (max-width: 1050px) {
          .stockify-watchlist-layout {
            grid-template-columns: 1fr;
          }

          .stockify-watchlist-chart-card {
            max-width: none;
          }
        }

        @media (max-width: 720px) {
          .stockify-watchlist-page {
            padding: 22px 14px 35px;
          }

          .stockify-watchlist-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .stockify-watchlist-toolbar {
            align-items: stretch;
            flex-direction: column;
          }

          .stockify-watchlist-count {
            text-align: right;
          }

          .stockify-watchlist-row {
            align-items: flex-start;
            flex-wrap: wrap;
            padding: 13px 14px;
          }

          .stockify-watchlist-stock {
            flex-basis: calc(100% - 115px);
          }

          .stockify-watchlist-quote {
            min-width: 105px;
            flex-basis: auto;
          }

          .stockify-watchlist-actions {
            width: 100%;
            min-width: 0;
            justify-content: flex-start;
            padding-left: 41px;
          }

          .stockify-watchlist-action-button {
            min-width: 38px;
            height: 32px;
          }
        }

        @media (max-width: 430px) {
          .stockify-watchlist-title {
            font-size: 23px;
          }

          .stockify-watchlist-quote {
            min-width: 100%;
            justify-content: space-between;
            padding-left: 41px;
          }

          .stockify-watchlist-price {
            text-align: left;
          }

          .stockify-watchlist-actions {
            padding-left: 41px;
          }
        }
      `}</style>

      <main className="stockify-watchlist-page">

        <header className="stockify-watchlist-header">
          <div>
            <p className="stockify-watchlist-kicker">
              MARKET
            </p>

            <h1 className="stockify-watchlist-title">
              Watchlist
            </h1>

            <p className="stockify-watchlist-subtitle">
              Track the stocks you are watching and act quickly.
            </p>
          </div>

          <span className="stockify-watchlist-limit">
            {watchlist.length} / 50 stocks
          </span>
        </header>

        <section className="stockify-watchlist-layout">

          <div className="stockify-watchlist-card">

            <div className="stockify-watchlist-toolbar">

              <div className="stockify-watchlist-search">

                <SearchOutlined
                  className="stockify-watchlist-search-icon"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search stocks e.g. INFY, TCS, RELIANCE"
                  className="stockify-watchlist-input"
                  aria-label="Search stocks"
                />

              </div>

              <span className="stockify-watchlist-count">
                {filteredStocks.length} result
                {filteredStocks.length === 1 ? "" : "s"}
              </span>

            </div>

            {filteredStocks.length === 0 ? (
              <div className="stockify-watchlist-empty">
                No stocks found for “{search}”.
              </div>
            ) : (
              <ul className="stockify-watchlist-list">
                {filteredStocks.map((stock) => (
                  <WatchListItem
                    stock={stock}
                    key={stock.name}
                  />
                ))}
              </ul>
            )}

          </div>

          <aside className="stockify-watchlist-chart-card">

            <div className="stockify-watchlist-chart-header">

              <p className="stockify-watchlist-chart-kicker">
                MARKET SNAPSHOT
              </p>

              <h2 className="stockify-watchlist-chart-title">
                Price distribution
              </h2>

              <p className="stockify-watchlist-chart-subtitle">
                Current price comparison across your watchlist.
              </p>

            </div>

            <div className="stockify-watchlist-chart">
              <DoughnutChart data={data} />
            </div>

            <p className="stockify-watchlist-chart-note">
              Prices shown are demo values from the current
              Stockify dataset.
            </p>

          </aside>

        </section>

      </main>
    </>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showActions, setShowActions] = useState(false);

  const formattedPrice = Number(
    stock.price || 0
  ).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const isDown = Boolean(stock.isDown);

  return (
    <li
      className="stockify-watchlist-row"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >

      <div className="stockify-watchlist-stock">

        <span className="stockify-watchlist-symbol">
          {String(stock.name).slice(0, 2)}
        </span>

        <span className="stockify-watchlist-name">
          {stock.name}
        </span>

      </div>

      <div className="stockify-watchlist-quote">

        <span
          className={`stockify-watchlist-percent ${
            isDown ? "down" : "up"
          }`}
        >
          {stock.percent}
        </span>

        {isDown ? (
          <KeyboardArrowDown
            className="stockify-watchlist-arrow down"
          />
        ) : (
          <KeyboardArrowUp
            className="stockify-watchlist-arrow up"
          />
        )}

        <span className="stockify-watchlist-price">
          ₹{formattedPrice}
        </span>

      </div>

      {showActions && (
        <WatchListActions uid={stock.name} />
      )}

    </li>
  );
};

const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    if (generalContext?.openBuyWindow) {
      generalContext.openBuyWindow(uid);
    }
  };

  const handleSellClick = () => {
    if (generalContext?.openSellWindow) {
      generalContext.openSellWindow(uid);
    }
  };

  return (
    <div className="stockify-watchlist-actions">

      <Tooltip
        title="Buy (B)"
        placement="top"
        arrow
        TransitionComponent={Grow}
      >
        <button
          type="button"
          className="stockify-watchlist-action-button buy"
          onClick={handleBuyClick}
          aria-label={`Buy ${uid}`}
        >
          Buy
        </button>
      </Tooltip>

      <Tooltip
        title="Sell (S)"
        placement="top"
        arrow
        TransitionComponent={Grow}
      >
        <button
          type="button"
          className="stockify-watchlist-action-button sell"
          onClick={handleSellClick}
          aria-label={`Sell ${uid}`}
        >
          Sell
        </button>
      </Tooltip>

      <Tooltip
        title="View Analytics"
        placement="top"
        arrow
        TransitionComponent={Grow}
      >
        <button
          type="button"
          className="stockify-watchlist-action-button icon"
          aria-label={`View analytics for ${uid}`}
        >
          <BarChartOutlined className="stockify-watchlist-action-icon" />
        </button>
      </Tooltip>

      <Tooltip
        title="More actions"
        placement="top"
        arrow
        TransitionComponent={Grow}
      >
        <button
          type="button"
          className="stockify-watchlist-action-button icon"
          aria-label={`More actions for ${uid}`}
        >
          <MoreHoriz className="stockify-watchlist-action-icon" />
        </button>
      </Tooltip>

    </div>
  );
};