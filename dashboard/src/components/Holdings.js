import React from "react";

const Holdings = () => {
  return (
    <>
      <h3 className="title">
        {/* Holdings Title */}
      </h3>

      <div className="order-table">
        <table>
          <tr>
            {/* Instrument */}
            {/* Quantity */}
            {/* Average Cost */}
            {/* LTP */}
            {/* Current Value */}
            {/* P&L */}
            {/* Net Change */}
            {/* Day Change */}
          </tr>

          {/* Holdings Rows */}
        </table>
      </div>

      <div className="row">
        <div className="col">
          {/* Total Investment */}
        </div>

        <div className="col">
          {/* Current Value */}
        </div>

        <div className="col">
          {/* Profit & Loss Summary */}
        </div>
      </div>
    </>
  );
};

export default Holdings;
