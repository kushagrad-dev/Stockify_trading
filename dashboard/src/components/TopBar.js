import React from "react";
import Menu from "./Menu";

const TopBar = () => {
  return (
    <header className="stockify-topbar">
      <div className="stockify-topbar-indices">
        <div className="stockify-topbar-index-card">
          <span className="stockify-topbar-index-name">
            NIFTY 50
          </span>

          <span className="stockify-topbar-index-value">
            24,500.90
          </span>

          <span className="stockify-topbar-index-change positive">
            +0.42%
          </span>
        </div>

        <span className="stockify-topbar-divider" />

        <div className="stockify-topbar-index-card">
          <span className="stockify-topbar-index-name">
            SENSEX
          </span>

          <span className="stockify-topbar-index-value">
            80,436.84
          </span>

          <span className="stockify-topbar-index-change positive">
            +0.35%
          </span>
        </div>
      </div>

      <nav className="stockify-topbar-menu">
        <Menu />
      </nav>

      <style>{`
        .stockify-topbar {
          width: 100%;
          height: 64px;
          padding: 0 32px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          background: #ffffff;
          border-bottom: 1px solid #e8eaed;

          box-sizing: border-box;
          position: relative;
          z-index: 100;
        }

        .stockify-topbar-indices {
          display: flex;
          align-items: center;
          gap: 22px;

          flex-shrink: 0;
          height: 100%;
        }

        .stockify-topbar-index-card {
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }

        .stockify-topbar-index-name {
          color: #555b64;
          font-size: 11px;
          font-weight: 600;
        }

        .stockify-topbar-index-value {
          color: #30343b;
          font-size: 12px;
          font-weight: 600;
        }

        .stockify-topbar-index-change {
          font-size: 10px;
          font-weight: 600;
        }

        .stockify-topbar-index-change.positive {
          color: #2e7d32;
        }

        .stockify-topbar-index-change.negative {
          color: #d14343;
        }

        .stockify-topbar-divider {
          width: 1px;
          height: 22px;
          background: #e5e7eb;
        }

        .stockify-topbar-menu {
          margin-left: auto;

          display: flex;
          align-items: center;
          justify-content: flex-end;

          height: 100%;
          flex-shrink: 0;
        }

        .stockify-topbar-menu > * {
          height: 100% !important;
          width: auto !important;

          display: flex !important;
          align-items: center !important;

          margin: 0 !important;
          padding: 0 !important;

          white-space: nowrap !important;
        }

        .stockify-topbar-menu a {
          display: inline-flex !important;
          align-items: center !important;

          margin-left: 24px !important;

          color: #333333;
          text-decoration: none;

          font-size: 14px;
          font-weight: 500;

          white-space: nowrap;
        }

        .stockify-topbar-menu a:hover {
          color: #387ed1;
        }

        @media (max-width: 900px) {
          .stockify-topbar {
            padding: 0 20px;
          }

          .stockify-topbar-menu a {
            margin-left: 16px !important;
            font-size: 13px;
          }
        }

        @media (max-width: 700px) {
          .stockify-topbar {
            height: auto;
            min-height: 58px;
            padding: 10px 16px;

            flex-wrap: wrap;
            gap: 8px;
          }

          .stockify-topbar-indices {
            height: 38px;
          }

          .stockify-topbar-menu {
            height: 38px;
            width: 100%;
            justify-content: flex-start;
          }

          .stockify-topbar-menu a {
            margin-left: 0 !important;
            margin-right: 18px !important;
          }
        }
      `}</style>
    </header>
  );
};

export default TopBar;