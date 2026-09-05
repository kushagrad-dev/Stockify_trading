import React, { useContext, useMemo, useState } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";
import { watchlist } from "../data/data";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3008";

const SellActionWindow = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  const selectedStock = useMemo(
    () =>
      watchlist.find(
        (stock) =>
          String(stock.name).toUpperCase() ===
          String(uid).toUpperCase()
      ),
    [uid]
  );

  const currentStockPrice = Number(selectedStock?.price) || 0;

  const [stockQuantity, setStockQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const totalValue =
    (Number(stockQuantity) || 0) * currentStockPrice;

  const handleSellClick = async () => {
    const quantity = Number(stockQuantity);

    if (!Number.isFinite(quantity) || quantity <= 0) {
      setError("Please enter a valid quantity.");
      return;
    }

    if (!Number.isInteger(quantity)) {
      setError("Quantity must be a whole number.");
      return;
    }

    if (!currentStockPrice || currentStockPrice <= 0) {
      setError("Current stock price is not available.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await axios.post(`${API_URL}/sellOrder`, {
        name: uid,
        qty: quantity,
        price: currentStockPrice,
        mode: "SELL",
      });

      if (generalContext?.closeSellWindow) {
        generalContext.closeSellWindow();
      }

      // Refresh the dashboard so Holdings/Orders update.
      window.dispatchEvent(new Event("stockify:data-updated"));
    } catch (err) {
      console.error("Failed to sell stock:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to sell the stock. Please check that the backend is running."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    if (!isSubmitting && generalContext?.closeSellWindow) {
      generalContext.closeSellWindow();
    }
  };

  return (
    <div className="stockify-sell-overlay">
      <div
        className="stockify-sell-window"
        role="dialog"
        aria-modal="true"
        aria-labelledby="stockify-sell-title"
      >
        <style>{`
          .stockify-sell-overlay {
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: rgba(20, 25, 32, 0.28);
            backdrop-filter: blur(3px);
          }

          .stockify-sell-window {
            width: min(440px, 100%);
            overflow: hidden;
            border: 1px solid #e1e5e9;
            border-radius: 14px;
            background: #fff;
            box-shadow: 0 18px 55px rgba(0, 0, 0, 0.16);
            color: #202124;
            font-family: -apple-system, BlinkMacSystemFont,
              "Segoe UI", Roboto, Arial, sans-serif;
          }

          .stockify-sell-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            padding: 18px 20px;
            border-bottom: 1px solid #eceef1;
          }

          .stockify-sell-eyebrow {
            margin: 0 0 5px;
            color: #8a9099;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 0.13em;
          }

          .stockify-sell-title {
            margin: 0;
            color: #202124;
            font-size: 18px;
            font-weight: 600;
          }

          .stockify-sell-symbol {
            padding: 7px 10px;
            border-radius: 7px;
            background: #fff0f0;
            color: #df514c;
            font-size: 11px;
            font-weight: 700;
          }

          .stockify-sell-body {
            padding: 20px;
          }

          .stockify-sell-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .stockify-sell-label {
            display: block;
            margin-bottom: 7px;
            color: #737983;
            font-size: 10px;
            font-weight: 600;
          }

          .stockify-sell-input {
            width: 100%;
            height: 44px;
            box-sizing: border-box;
            padding: 0 12px;
            border: 1px solid #dfe3e8;
            border-radius: 8px;
            outline: none;
            background: #fff;
            color: #202124;
            font-size: 13px;
          }

          .stockify-sell-input:focus {
            border-color: #df514c;
            box-shadow: 0 0 0 3px rgba(223, 81, 76, 0.1);
          }

          .stockify-sell-summary {
            margin-top: 18px;
            padding: 14px;
            border: 1px solid #edf0f3;
            border-radius: 9px;
            background: #f8fafc;
          }

          .stockify-sell-summary-label {
            margin: 0 0 4px;
            color: #737983;
            font-size: 10px;
          }

          .stockify-sell-summary-value {
            margin: 0;
            color: #202124;
            font-size: 17px;
            font-weight: 600;
          }

          .stockify-sell-error {
            margin: 14px 0 0;
            padding: 10px 12px;
            border: 1px solid #f0d5d5;
            border-radius: 7px;
            background: #fff7f7;
            color: #c43d3d;
            font-size: 10px;
            line-height: 1.45;
          }

          .stockify-sell-footer {
            display: flex;
            justify-content: flex-end;
            gap: 8px;
            padding: 15px 20px;
            border-top: 1px solid #eceef1;
            background: #fcfcfd;
          }

          .stockify-sell-button {
            min-width: 76px;
            height: 36px;
            padding: 0 14px;
            border-radius: 7px;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
          }

          .stockify-sell-button:disabled {
            cursor: not-allowed;
            opacity: 0.55;
          }

          .stockify-sell-button.cancel {
            border: 1px solid #dfe3e8;
            background: #fff;
            color: #555b64;
          }

          .stockify-sell-button.sell {
            border: 0;
            background: #df514c;
            color: #fff;
          }

          @media (max-width: 500px) {
            .stockify-sell-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>

        <div className="stockify-sell-header">
          <div>
            <p className="stockify-sell-eyebrow">
              REGULAR ORDER
            </p>

            <h2
              id="stockify-sell-title"
              className="stockify-sell-title"
            >
              Sell stock
            </h2>
          </div>

          <span className="stockify-sell-symbol">
            {uid || "STOCK"}
          </span>
        </div>

        <div className="stockify-sell-body">
          <div className="stockify-sell-grid">
            <div>
              <label
                className="stockify-sell-label"
                htmlFor="stockify-sell-quantity"
              >
                Quantity
              </label>

              <input
                className="stockify-sell-input"
                id="stockify-sell-quantity"
                type="number"
                min="1"
                step="1"
                value={stockQuantity}
                disabled={isSubmitting}
                onChange={(e) => {
                  setStockQuantity(e.target.value);
                  setError("");
                }}
              />
            </div>

            <div>
              <label className="stockify-sell-label">
                Current price per share
              </label>

              <input
                className="stockify-sell-input"
                type="number"
                value={currentStockPrice}
                readOnly
                disabled
              />
            </div>
          </div>

          {!selectedStock && (
            <p className="stockify-sell-error">
              Current price for {uid || "this stock"} could not be found.
            </p>
          )}

          <div className="stockify-sell-summary">
            <p className="stockify-sell-summary-label">
              Total sell value
            </p>

            <p className="stockify-sell-summary-value">
              ₹
              {totalValue.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>

          {error && (
            <p className="stockify-sell-error">
              {error}
            </p>
          )}
        </div>

        <div className="stockify-sell-footer">
          <button
            type="button"
            className="stockify-sell-button cancel"
            onClick={handleCancelClick}
            disabled={isSubmitting}
          >
            Cancel
          </button>

          <button
            type="button"
            className="stockify-sell-button sell"
            onClick={handleSellClick}
            disabled={isSubmitting || !selectedStock}
          >
            {isSubmitting ? "Selling..." : "Sell"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
