import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export function DoughnutChart({ data }) {
  const chartData = {
    ...data,
    datasets: data?.datasets?.map((dataset) => ({
      ...dataset,
      borderWidth: 0,
      hoverOffset: 6,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    cutout: "68%",

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 16,

          font: {
            size: 11,
          },

          color: "#737983",
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

            return ` ₹${value.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`;
          },
        },
      },
    },

    animation: {
      duration: 500,
    },
  };

  return (
    <div className="stockify-doughnut-wrapper">
      <style>{`
        .stockify-doughnut-wrapper {
          position: relative;

          width: 100%;
          height: 300px;

          margin-top: 24px;
          padding: 18px;

          border: 1px solid #e5e7eb;
          border-radius: 12px;

          background: #ffffff;

          box-shadow:
            0 2px 10px rgba(0, 0, 0, 0.035);

          box-sizing: border-box;
        }

        .stockify-doughnut-wrapper canvas {
          max-width: 100% !important;
        }

        @media (max-width: 600px) {
          .stockify-doughnut-wrapper {
            height: 270px;
            padding: 14px;
          }
        }
      `}</style>

      <Doughnut
        data={chartData}
        options={options}
      />
    </div>
  );
}

export default DoughnutChart;