import React from 'react';

function Awards() {
  return (
    <div className="container py-5">
      <div className="row align-items-center pt-5 mt-4">
        <div className="col-lg-6 col-md-12 text-center mb-5 mb-lg-0">
          <img
            src="media/largestBroker.svg"
            alt="Largest Broker"
            className="img-fluid"
          />
        </div>

        <div className="col-lg-6 col-md-12">
          <h1 className="mb-4">Largest Stock Broker in India</h1>

          <p className="mb-4">
            2+ million Zerodha clients contribute to over 15% of all retail order volumes in India daily by trading and investing in
          </p>

          <div className="row mb-4">
            <div className="col-6">
              <ul>
                <li><p>Futures and Options</p></li>
                <li><p>Commodity derivatives</p></li>
                <li><p>Currency derivatives</p></li>
              </ul>
            </div>

            <div className="col-6">
              <ul>
                <li><p>Stocks & IPOs</p></li>
                <li><p>Direct mutual funds</p></li>
                <li><p>Bonds and government securities</p></li>
              </ul>
            </div>
          </div>

          <img
            src="media/pressLogos.png"
            alt="Press Logos"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
}

export default Awards;