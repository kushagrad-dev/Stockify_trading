import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export function VerticalGraph({ data }) {
  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      resizeDelay: 100,

      animation: {
        duration: 400,
      },

      layout: {
        padding: {
          top: 4,
          right: 8,
          bottom: 2,
          left: 4,
        },
      },

      plugins: {
        legend: {
          position: "bottom",
          align: "start",

          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            boxWidth: 7,
            boxHeight: 7,
            padding: 14,
            color: "#737983",

            font: {
              size: 10,
              family:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
            },
          },
        },

        tooltip: {
          backgroundColor: "#202124",
          titleColor: "#ffffff",
          bodyColor: "#ffffff",
          padding: 10,
          cornerRadius: 7,
          displayColors: true,

          callbacks: {
            label: (context) => {
              const value = Number(context.raw) || 0;

              return ` ${context.dataset.label || "Value"}: ₹${value.toLocaleString(
                "en-IN",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}`;
            },
          },
        },
      },

      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },

          border: {
            display: false,
          },

          ticks: {
            color: "#737983",
            padding: 7,
            maxRotation: 0,
            minRotation: 0,

            font: {
              size: 10,
              family:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
            },
          },
        },

        y: {
          beginAtZero: true,

          grid: {
            color: "#edf0f3",
            drawBorder: false,
          },

          border: {
            display: false,
          },

          ticks: {
            color: "#8a9099",
            padding: 7,
            maxTicksLimit: 5,

            font: {
              size: 9,
              family:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
            },

            callback: (value) => {
              const amount = Number(value) || 0;

              if (amount >= 10000000) {
                return `₹${(amount / 10000000).toFixed(1)}Cr`;
              }

              if (amount >= 100000) {
                return `₹${(amount / 100000).toFixed(1)}L`;
              }

              if (amount >= 1000) {
                return `₹${(amount / 1000).toFixed(0)}k`;
              }

              return `₹${amount}`;
            },
          },
        },
      },

      datasets: {
        bar: {
          borderRadius: 5,
          borderSkipped: false,
          maxBarThickness: 42,
          categoryPercentage: 0.72,
          barPercentage: 0.78,
        },
      },
    }),
    []
  );

  const chartData = useMemo(() => {
    if (!data) {
      return {
        labels: [],
        datasets: [],
      };
    }

    return {
      ...data,

      datasets: (data.datasets || []).map((dataset) => ({
        ...dataset,
        borderRadius: 5,
        borderSkipped: false,
        maxBarThickness: 42,
      })),
    };
  }, [data]);

  return (
    <section className="stockify-vertical-graph-card">
      <style>{`
        .stockify-vertical-graph-card {
          width: 100%;
          min-width: 0;
          overflow: hidden;

          padding: 20px;

          border: 1px solid #e5e7eb;
          border-radius: 12px;

          background: #ffffff;

          box-shadow:
            0 2px 10px rgba(0, 0, 0, 0.035);

          color: #202124;

          font-family:
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            Arial,
            sans-serif;
        }

        .stockify-vertical-graph-card * {
          box-sizing: border-box;
        }

        .stockify-vertical-graph-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;

          margin-bottom: 16px;
        }

        .stockify-vertical-graph-eyebrow {
          display: block;

          margin-bottom: 5px;

          color: #8a9099;

          font-size: 9px;
          font-weight: 700;

          letter-spacing: 0.13em;
        }

        .stockify-vertical-graph-title {
          margin: 0;

          color: #202124;

          font-size: 16px;
          font-weight: 600;

          line-height: 1.3;
        }

        .stockify-vertical-graph-subtitle {
          margin: 5px 0 0;

          color: #8a9099;

          font-size: 10px;

          line-height: 1.45;
        }

        .stockify-vertical-graph-chart {
          position: relative;

          width: 100%;
          height: 300px;

          min-height: 260px;
          max-height: 360px;
        }

        .stockify-vertical-graph-chart canvas {
          display: block !important;

          width: 100% !important;
          height: 100% !important;

          max-width: 100% !important;
        }

        @media (max-width: 700px) {
          .stockify-vertical-graph-card {
            padding: 16px;
          }

          .stockify-vertical-graph-chart {
            height: 270px;
            min-height: 240px;
          }
        }

        @media (max-width: 450px) {
          .stockify-vertical-graph-chart {
            height: 250px;
            min-height: 220px;
          }
        }
      `}</style>

      <div className="stockify-vertical-graph-header">
        <div>
          <span className="stockify-vertical-graph-eyebrow">
            PORTFOLIO
          </span>

          <h3 className="stockify-vertical-graph-title">
            Holdings
          </h3>

          <p className="stockify-vertical-graph-subtitle">
            Current value of your stock holdings.
          </p>
        </div>
      </div>

      <div className="stockify-vertical-graph-chart">
        <Bar
          options={options}
          data={chartData}
        />
      </div>
    </section>
  );
}

export default VerticalGraph;