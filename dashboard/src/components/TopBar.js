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

      <div className="stockify-topbar-menu">
        <Menu />
      </div>

      <style>{`
        .stockify-topbar {
          width: 100%;
          height: 64px;
          min-height: 64px;
          max-height: 64px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 24px;
          padding: 0 28px;
          margin: 0;

          border-bottom: 1px solid #e8eaed;

          background: #ffffff;
          color: #202124;

          overflow: hidden;

          box-sizing: border-box;

          position: relative;
          z-index: 100;
        }

        .stockify-topbar * {
          box-sizing: border-box;
        }

        .stockify-topbar-indices {
          min-width: 0;
          flex: 0 0 auto;

          display: flex;
          align-items: center;

          gap: 20px;

          height: 100%;

          white-space: nowrap;
        }

        .stockify-topbar-index-card {
          display: inline-flex;
          align-items: center;

          gap: 8px;

          min-width: 0;

          white-space: nowrap;
        }

        .stockify-topbar-index-name {
          color: #555b64;

          font-size: 11px;
          font-weight: 600;

          white-space: nowrap;
        }

        .stockify-topbar-index-value {
          color: #30343b;

          font-size: 12px;
          font-weight: 600;

          white-space: nowrap;
        }

        .stockify-topbar-index-change {
          font-size: 10px;
          font-weight: 600;

          white-space: nowrap;
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

          flex: 0 0 1px;

          background: #e5e7eb;
        }

        .stockify-topbar-menu {
          min-width: 0;

          flex: 1 1 auto;

          height: 100%;

          display: flex;
          align-items: center;
          justify-content: flex-end;

          overflow: hidden;
        }

        /*
         * Prevent the existing Menu component from
         * wrapping and increasing the TopBar height.
         */
        .stockify-topbar-menu > * {
          width: auto !important;
          max-width: 100%;

          min-width: 0 !important;

          height: 100% !important;
          min-height: 0 !important;
          max-height: 64px !important;

          flex: 1 1 auto !important;

          display: flex !important;
          align-items: center !important;
          justify-content: flex-end !important;

          flex-wrap: nowrap !important;

          white-space: nowrap !important;

          margin: 0 !important;
        }

        .stockify-topbar-menu > * > * {
          max-width: 100%;

          flex-wrap: nowrap !important;

          white-space: nowrap !important;
        }

        .stockify-topbar-menu a,
        .stockify-topbar-menu button,
        .stockify-topbar-menu img,
        .stockify-topbar-menu span,
        .stockify-topbar-menu p {
          flex-shrink: 0;
        }

        @media (max-width: 900px) {
          .stockify-topbar {
            gap: 16px;
            padding: 0 20px;
          }

          .stockify-topbar-indices {
            gap: 12px;
          }

          .stockify-topbar-index-card {
            gap: 6px;
          }
        }

        @media (max-width: 700px) {
          .stockify-topbar {
            height: 58px;
            min-height: 58px;
            max-height: 58px;

            padding: 0 16px;
          }

          .stockify-topbar-menu > * {
            max-height: 58px !important;
          }

          .stockify-topbar-index-change {
            display: none;
          }

          .stockify-topbar-index-name {
            font-size: 10px;
          }

          .stockify-topbar-index-value {
            font-size: 11px;
          }
        }

        @media (max-width: 520px) {
          .stockify-topbar {
            gap: 12px;
            padding: 0 13px;
          }

          .stockify-topbar-indices {
            gap: 10px;
          }

          .stockify-topbar-index-card {
            gap: 5px;
          }

          .stockify-topbar-index-name {
            font-size: 9px;
          }

          .stockify-topbar-index-value {
            font-size: 10px;
          }

          .stockify-topbar-divider {
            height: 18px;
          }
        }
      `}</style>
    </header>
  );
};

export default TopBar;