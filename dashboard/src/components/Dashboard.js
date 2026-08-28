import React from "react";
import { Routes, Route } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  return (
    <GeneralContextProvider>
      <div className="stockify-dashboard-shell">
        <style>{`
          .stockify-dashboard-shell {
            width: 100%;
            height: 100vh;
            min-height: 100vh;
            display: grid;
            grid-template-columns: 300px minmax(0, 1fr);
            overflow: hidden;
            background: #fafafa;
            color: #202124;
            font-family: -apple-system, BlinkMacSystemFont,
              "Segoe UI", Roboto, Arial, sans-serif;
          }

          .stockify-dashboard-shell,
          .stockify-dashboard-shell * {
            box-sizing: border-box;
          }

          /* WATCHLIST SIDEBAR */
          .stockify-dashboard-sidebar {
            position: relative;
            z-index: 20;
            width: 300px;
            min-width: 300px;
            height: 100vh;
            min-height: 0;
            overflow-y: auto;
            overflow-x: hidden;
            border-right: 1px solid #e5e7eb;
            background: #fff;
          }

          /*
            Important:
            WatchList has its own page wrapper.
            These rules force it to stay inside
            the 300px sidebar instead of expanding
            across the dashboard.
          */
          .stockify-dashboard-sidebar .stockify-watchlist-page {
            width: 100%;
            max-width: none;
            min-height: 100%;
            margin: 0;
            padding: 20px 16px 28px;
          }

          .stockify-dashboard-sidebar .stockify-watchlist-header {
            align-items: flex-start;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 16px;
          }

          .stockify-dashboard-sidebar .stockify-watchlist-title {
            font-size: 24px;
          }

          .stockify-dashboard-sidebar .stockify-watchlist-subtitle {
            max-width: 230px;
          }

          .stockify-dashboard-sidebar .stockify-watchlist-limit {
            align-self: flex-start;
          }

          .stockify-dashboard-sidebar .stockify-watchlist-layout {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 16px;
          }

          .stockify-dashboard-sidebar .stockify-watchlist-card,
          .stockify-dashboard-sidebar .stockify-watchlist-chart-card {
            width: 100%;
            max-width: none;
          }

          .stockify-dashboard-sidebar .stockify-watchlist-toolbar {
            align-items: stretch;
            flex-direction: column;
            gap: 10px;
            padding: 12px;
          }

          .stockify-dashboard-sidebar .stockify-watchlist-count {
            text-align: right;
          }

          .stockify-dashboard-sidebar .stockify-watchlist-row {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            min-height: 64px;
            gap: 7px;
            padding: 10px 12px;
          }

          .stockify-dashboard-sidebar .stockify-watchlist-stock {
            min-width: 0;
            flex: 1 1 100px;
          }

          .stockify-dashboard-sidebar .stockify-watchlist-quote {
            min-width: 0;
            flex: 0 0 auto;
            gap: 3px;
          }

          .stockify-dashboard-sidebar .stockify-watchlist-price {
            min-width: 65px;
            font-size: 11px;
          }

          .stockify-dashboard-sidebar .stockify-watchlist-percent {
            font-size: 10px;
          }

          .stockify-dashboard-sidebar .stockify-watchlist-actions {
            width: 100%;
            min-width: 0;
            justify-content: flex-start;
            padding-left: 0;
          }

          .stockify-dashboard-sidebar .stockify-watchlist-chart-card {
            padding: 15px;
          }

          .stockify-dashboard-sidebar .stockify-watchlist-chart {
            min-height: 220px;
          }

          /* MAIN DASHBOARD AREA */
          .stockify-dashboard-content {
            position: relative;
            z-index: 1;
            min-width: 0;
            width: 100%;
            height: 100vh;
            min-height: 0;
            overflow-x: hidden;
            overflow-y: auto;
            background: #fafafa;
          }

          .stockify-dashboard-content > * {
            width: 100%;
            min-width: 0;
          }

          /* Prevent redesigned pages from exceeding the
             available dashboard column. */
          .stockify-dashboard-content .funds-page,
          .stockify-dashboard-content .stockify-holdings-page,
          .stockify-dashboard-content .stockify-positions-page,
          .stockify-dashboard-content .stockify-orders-page,
          .stockify-dashboard-content .stockify-apps-page {
            max-width: 100%;
          }

          /* TABLET */
          @media (max-width: 1050px) {
            .stockify-dashboard-shell {
              grid-template-columns: 270px minmax(0, 1fr);
            }

            .stockify-dashboard-sidebar {
              width: 270px;
              min-width: 270px;
            }
          }

          /* MOBILE */
          @media (max-width: 820px) {
            .stockify-dashboard-shell {
              height: auto;
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              overflow: visible;
            }

            .stockify-dashboard-sidebar {
              width: 100%;
              min-width: 0;
              height: auto;
              max-height: none;
              overflow: visible;
              border-right: 0;
              border-bottom: 1px solid #e5e7eb;
            }

            .stockify-dashboard-sidebar .stockify-watchlist-page {
              min-height: auto;
              padding: 18px 14px 24px;
            }

            .stockify-dashboard-sidebar .stockify-watchlist-layout {
              display: grid;
              grid-template-columns:
                minmax(0, 1fr)
                minmax(240px, 300px);
              align-items: start;
            }

            .stockify-dashboard-content {
              width: 100%;
              height: auto;
              min-height: 0;
              overflow: visible;
            }
          }

          @media (max-width: 650px) {
            .stockify-dashboard-sidebar
              .stockify-watchlist-layout {
              display: flex;
              flex-direction: column;
            }
          }
        `}</style>

        {/* WATCHLIST SIDEBAR */}
        <aside className="stockify-dashboard-sidebar">
          <WatchList />
        </aside>

        {/* MAIN CONTENT */}
        <main className="stockify-dashboard-content">
          <Routes>
            <Route path="/" element={<Summary />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/funds" element={<Funds />} />
            <Route path="/apps" element={<Apps />} />
          </Routes>
        </main>
      </div>
    </GeneralContextProvider>
  );
};

export default Dashboard;