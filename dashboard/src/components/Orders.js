import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3008";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`${API_URL}/orders`);

        setOrders(response.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);

        setError(
          "Unable to load orders. Please check that the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <main className="stockify-orders-page">
      <style>{`
        .stockify-orders-page {
          width: 100%;
          min-height: 100%;
          padding: 32px 34px 48px;
          background: #fafafa;
          color: #202124;
          font-family: -apple-system, BlinkMacSystemFont,
            "Segoe UI", Roboto, Arial, sans-serif;
          box-sizing: border-box;
        }

        .stockify-orders-page * {
          box-sizing: border-box;
        }

        .stockify-orders-header {
          margin-bottom: 22px;
        }

        .stockify-orders-eyebrow {
          margin: 0 0 7px;
          color: #8a9099;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.13em;
        }

        .stockify-orders-title {
          margin: 0;
          color: #202124;
          font-size: 24px;
          font-weight: 500;
        }

        .stockify-orders-card {
          width: 100%;
          overflow: hidden;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          background: #ffffff;
        }

        .stockify-orders-table {
          width: 100%;
          border-collapse: collapse;
        }

        .stockify-orders-table th {
          padding: 14px 18px;
          border-bottom: 1px solid #eceef1;
          color: #737983;
          background: #fafafa;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-align: left;
        }

        .stockify-orders-table td {
          padding: 16px 18px;
          border-bottom: 1px solid #f0f1f3;
          color: #30343a;
          font-size: 12px;
        }

        .stockify-orders-table tr:last-child td {
          border-bottom: 0;
        }

        .stockify-orders-symbol {
          font-weight: 600;
        }

        .stockify-orders-mode {
          display: inline-block;
          padding: 5px 9px;
          border-radius: 5px;
          background: #eef8f0;
          color: #16803c;
          font-size: 10px;
          font-weight: 700;
        }

        .stockify-orders-empty,
        .stockify-orders-error {
          padding: 55px 25px;
          text-align: center;
          color: #737983;
          font-size: 12px;
        }

        .stockify-orders-error {
          color: #c62828;
        }

        @media (max-width: 600px) {
          .stockify-orders-page {
            padding: 24px 16px 40px;
          }

          .stockify-orders-table th,
          .stockify-orders-table td {
            padding: 12px 10px;
          }
        }
      `}</style>

      <header className="stockify-orders-header">
        <p className="stockify-orders-eyebrow">
          ORDER HISTORY
        </p>

        <h1 className="stockify-orders-title">
          Orders
        </h1>
      </header>

      <section className="stockify-orders-card">
        {loading ? (
          <div className="stockify-orders-empty">
            Loading orders...
          </div>
        ) : error ? (
          <div className="stockify-orders-error">
            {error}
          </div>
        ) : orders.length === 0 ? (
          <div className="stockify-orders-empty">
            You haven't placed any orders yet.
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="stockify-orders-table">
              <thead>
                <tr>
                  <th>STOCK</th>
                  <th>TYPE</th>
                  <th>QUANTITY</th>
                  <th>PRICE</th>
                  <th>TOTAL</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => {
                  const quantity = Number(order.qty) || 0;
                  const price = Number(order.price) || 0;

                  return (
                    <tr key={order._id}>
                      <td className="stockify-orders-symbol">
                        {order.name}
                      </td>

                      <td>
                        <span className="stockify-orders-mode">
                          {order.mode}
                        </span>
                      </td>

                      <td>
                        {quantity}
                      </td>

                      <td>
                        ₹{price.toFixed(2)}
                      </td>

                      <td>
                        ₹{(quantity * price).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
};

export default Orders;