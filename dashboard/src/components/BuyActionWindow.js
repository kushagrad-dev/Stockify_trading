import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";
import { watchlist } from "../data/data";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3008";

const BuyActionWindow = ({ uid, mode = "BUY" }) => {
  const generalContext = useContext(GeneralContext);

  const isSellMode = mode === "SELL";

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
  const [stockPrice] = useState(currentStockPrice);

  const [ownedQuantity, setOwnedQuantity] = useState(null);
  const [isLoadingHolding, setIsLoadingHolding] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // GET HOLDING WHEN SELL WINDOW OPENS
  // ==========================================
  useEffect(() => {
    if (!isSellMode || !uid) return;

    const fetchHolding = async () => {
      setIsLoadingHolding(true);
      setError("");

      try {
        const response = await axios.get(
          `${API_URL}/allholdings`
        );

        const holdings = response?.data?.data || [];

        const holding = holdings.find(
          (item) =>
            String(item.name).toUpperCase() ===
            String(uid).toUpperCase()
        );

        if (!holding) {
          setOwnedQuantity(0);
          setError(`You do not own any ${uid} shares.`);
        } else {
          setOwnedQuantity(Number(holding.qty) || 0);
        }
      } catch (err) {
        console.error("Failed to fetch holding:", err);

        setError(
          err?.response?.data?.message ||
            "Unable to check your holdings."
        );
      } finally {
        setIsLoadingHolding(false);
      }
    };

    fetchHolding();
  }, [uid, isSellMode]);

  // ==========================================
  // TOTAL ORDER VALUE
  // ==========================================
  const marginRequired = useMemo(() => {
    const quantity = Number(stockQuantity) || 0;
    const price = Number(stockPrice) || 0;

    return quantity * price;
  }, [stockQuantity, stockPrice]);

  // ==========================================
  // BUY / SELL
  // ==========================================
  const handleActionClick = async () => {
    const quantity = Number(stockQuantity);
    const price = Number(stockPrice);

    // Quantity validation
    if (!Number.isFinite(quantity) || quantity <= 0) {
      setError("Please enter a valid quantity.");
      return;
    }

    if (!Number.isInteger(quantity)) {
      setError("Quantity must be a whole number.");
      return;
    }

    // Price validation
    if (!Number.isFinite(price) || price <= 0) {
      setError("Current stock price is not available.");
      return;
    }

    // ==========================================
    // SELL VALIDATION
    // ==========================================
    if (isSellMode) {
      if (ownedQuantity === null) {
        setError("Please wait while we check your holdings.");
        return;
      }

      if (ownedQuantity <= 0) {
        setError(`You do not own any ${uid} shares.`);
        return;
      }

      if (quantity > ownedQuantity) {
        setError(
          `You only own ${ownedQuantity} share${
            ownedQuantity === 1 ? "" : "s"
          } of ${uid}.`
        );
        return;
      }
    }

    setError("");
    setIsSubmitting(true);

    try {
      // ==========================================
      // SELL ORDER
      // ==========================================
      if (isSellMode) {
        await axios.post(`${API_URL}/sellOrder`, {
          name: uid,
          qty: quantity,
          price: price,
        });
      }

      // ==========================================
      // BUY ORDER
      // ==========================================
      else {
        await axios.post(`${API_URL}/addOrders`, {
          name: uid,
          qty: quantity,
          price: price,
          mode: "BUY",
        });
      }

      // Close modal
      if (generalContext?.closeBuyWindow) {
        generalContext.closeBuyWindow();
      }

      // Refresh dashboard so holdings/orders update
      window.location.reload();
    } catch (err) {
      console.error(
        `Failed to place ${
          isSellMode ? "sell" : "buy"
        } order:`,
        err
      );

      setError(
        err?.response?.data?.message ||
          `Unable to place the ${
            isSellMode ? "sell" : "buy"
          } order. Please check that the backend is running.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==========================================
  // CANCEL
  // ==========================================
  const handleCancelClick = () => {
    if (
      !isSubmitting &&
      generalContext?.closeBuyWindow
    ) {
      generalContext.closeBuyWindow();
    }
  };

  // ==========================================
  // FORMATTING
  // ==========================================
  const formattedPrice = Number(
    stockPrice || 0
  ).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedTotal = marginRequired.toLocaleString(
    "en-IN",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );

  return (
    <div className="stockify-buy-overlay">
      <div
        className="stockify-buy-window"
        role="dialog"
        aria-modal="true"
        aria-labelledby="stockify-action-title"
      >
        <style>{`
          .stockify-buy-overlay {
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

          .stockify-buy-window {
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

          .stockify-buy-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            padding: 18px 20px;
            border-bottom: 1px solid #eceef1;
          }

          .stockify-buy-heading {
            min-width: 0;
          }

          .stockify-buy-eyebrow {
            margin: 0 0 5px;
            color: #8a9099;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 0.13em;
          }

          .stockify-buy-title {
            margin: 0;
            color: #202124;
            font-size: 18px;
            font-weight: 600;
          }

          .stockify-buy-symbol {
            flex-shrink: 0;
            padding: 7px 10px;
            border-radius: 7px;
            background: ${isSellMode ? "#fff1f1" : "#eef5fc"};
            color: ${isSellMode ? "#d14b4b" : "#387ed1"};
            font-size: 11px;
            font-weight: 700;
          }

          .stockify-buy-body {
            padding: 20px;
          }

          .stockify-buy-input-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .stockify-buy-field {
            min-width: 0;
          }

          .stockify-buy-label {
            display: block;
            margin: 0 0 7px;
            color: #737983;
            font-size: 10px;
            font-weight: 600;
          }

          .stockify-buy-input {
            width: 100%;
            height: 44px;
            padding: 0 12px;
            border: 1px solid #dfe3e8;
            border-radius: 8px;
            outline: none;
            background: #fff;
            color: #202124;
            font-size: 13px;
            box-sizing: border-box;
          }

          .stockify-buy-input:focus {
            border-color: #387ed1;
            box-shadow: 0 0 0 3px rgba(56, 126, 209, 0.1);
          }

          .stockify-buy-input:disabled {
            background: #f8fafc;
            color: #737983;
          }

          .stockify-buy-summary {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 12px;
            align-items: center;
            margin-top: 18px;
            padding: 14px;
            border: 1px solid #edf0f3;
            border-radius: 9px;
            background: #f8fafc;
          }

          .stockify-buy-summary-label {
            margin: 0 0 4px;
            color: #737983;
            font-size: 10px;
          }

          .stockify-buy-summary-value {
            margin: 0;
            color: #202124;
            font-size: 17px;
            font-weight: 600;
          }

          .stockify-buy-summary-side {
            color: #8a9099;
            font-size: 10px;
            text-align: right;
          }

          .stockify-buy-error {
            margin: 14px 0 0;
            padding: 10px 12px;
            border: 1px solid #f0d5d5;
            border-radius: 7px;
            background: #fff7f7;
            color: #c43d3d;
            font-size: 10px;
            line-height: 1.45;
          }

          .stockify-buy-holding {
            margin-top: 12px;
            color: #737983;
            font-size: 10px;
          }

          .stockify-buy-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            padding: 15px 20px;
            border-top: 1px solid #eceef1;
            background: #fcfcfd;
          }

          .stockify-buy-margin {
            min-width: 0;
          }

          .stockify-buy-margin-label {
            display: block;
            margin-bottom: 3px;
            color: #8a9099;
            font-size: 9px;
          }

          .stockify-buy-margin-value {
            color: #30343b;
            font-size: 12px;
            font-weight: 600;
          }

          .stockify-buy-actions {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-shrink: 0;
          }

          .stockify-buy-button {
            min-width: 76px;
            height: 36px;
            padding: 0 14px;
            border: 0;
            border-radius: 7px;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
            transition:
              transform 0.12s ease,
              opacity 0.12s ease;
          }

          .stockify-buy-button:hover:not(:disabled) {
            transform: translateY(-1px);
          }

          .stockify-buy-button:disabled {
            cursor: not-allowed;
            opacity: 0.55;
          }

          .stockify-buy-button.buy {
            background: #387ed1;
            color: #fff;
          }

          .stockify-buy-button.sell {
            background: #d14b4b;
            color: #fff;
          }

          .stockify-buy-button.cancel {
            border: 1px solid #dfe3e8;
            background: #fff;
            color: #555b64;
          }

          @media (max-width: 500px) {
            .stockify-buy-overlay {
              padding: 12px;
            }

            .stockify-buy-input-grid {
              grid-template-columns: 1fr;
            }

            .stockify-buy-footer {
              align-items: stretch;
              flex-direction: column;
            }

            .stockify-buy-actions {
              width: 100%;
            }

            .stockify-buy-button {
              flex: 1;
            }
          }
        `}</style>

        {/* HEADER */}
        <div className="stockify-buy-header">
          <div className="stockify-buy-heading">
            <p className="stockify-buy-eyebrow">
              REGULAR ORDER
            </p>

            <h2
              id="stockify-action-title"
              className="stockify-buy-title"
            >
              {isSellMode ? "Sell stock" : "Buy stock"}
            </h2>
          </div>

          <span className="stockify-buy-symbol">
            {uid || "STOCK"}
          </span>
        </div>

        {/* BODY */}
        <div className="stockify-buy-body">
          <div className="stockify-buy-input-grid">

            {/* QUANTITY */}
            <div className="stockify-buy-field">
              <label
                className="stockify-buy-label"
                htmlFor="stockify-buy-quantity"
              >
                Quantity
              </label>

              <input
                className="stockify-buy-input"
                type="number"
                id="stockify-buy-quantity"
                min="1"
                max={
                  isSellMode && ownedQuantity > 0
                    ? ownedQuantity
                    : undefined
                }
                step="1"
                value={stockQuantity}
                onChange={(e) => {
                  setStockQuantity(e.target.value);
                  setError("");
                }}
                disabled={
                  isSubmitting ||
                  isLoadingHolding
                }
              />
            </div>

            {/* PRICE */}
            <div className="stockify-buy-field">
              <label
                className="stockify-buy-label"
                htmlFor="stockify-buy-price"
              >
                Current price per share
              </label>

              <input
                className="stockify-buy-input"
                type="number"
                id="stockify-buy-price"
                value={stockPrice}
                readOnly
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* OWNED QUANTITY */}
          {isSellMode &&
            ownedQuantity !== null && (
              <p className="stockify-buy-holding">
                Available to sell:{" "}
                <strong>{ownedQuantity}</strong>{" "}
                share
                {ownedQuantity === 1 ? "" : "s"}
              </p>
            )}

          {/* STOCK NOT FOUND */}
          {!selectedStock && (
            <p className="stockify-buy-error">
              Current price for{" "}
              {uid || "this stock"} could not be
              found.
            </p>
          )}

          {/* TOTAL */}
          <div className="stockify-buy-summary">
            <div>
              <p className="stockify-buy-summary-label">
                Total order value (
                {stockQuantity || 0} × ₹
                {formattedPrice})
              </p>

              <p className="stockify-buy-summary-value">
                ₹{formattedTotal}
              </p>
            </div>

            <span className="stockify-buy-summary-side">
              CNC / {isSellMode ? "SELL" : "BUY"}
            </span>
          </div>

          {/* ERROR */}
          {error && (
            <p className="stockify-buy-error">
              {error}
            </p>
          )}
        </div>

        {/* FOOTER */}
        <div className="stockify-buy-footer">

          <div className="stockify-buy-margin">
            <span className="stockify-buy-margin-label">
              {isSellMode
                ? "Sell value"
                : "Margin required"}
            </span>

            <span className="stockify-buy-margin-value">
              ₹{formattedTotal}
            </span>
          </div>

          <div className="stockify-buy-actions">

            {/* CANCEL */}
            <button
              type="button"
              className="stockify-buy-button cancel"
              onClick={handleCancelClick}
              disabled={isSubmitting}
            >
              Cancel
            </button>

            {/* BUY / SELL */}
            <button
              type="button"
              className={`stockify-buy-button ${
                isSellMode ? "sell" : "buy"
              }`}
              onClick={handleActionClick}
              disabled={
                isSubmitting ||
                isLoadingHolding ||
                !selectedStock ||
                (isSellMode &&
                  (ownedQuantity === null ||
                    ownedQuantity <= 0))
              }
            >
              {isSubmitting
                ? isSellMode
                  ? "Selling..."
                  : "Placing..."
                : isSellMode
                ? "Sell"
                : "Buy"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;