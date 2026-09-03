import React from "react";
import { Link } from "react-router-dom";

function Universe() {
  return (
    <div className="container py-5 my-5">
      <div className="row text-center justify-content-center mb-5">
        <div className="col-lg-8">
          <hr className="p-5" />
          <h1 className="fw-bold mb-3">The Stockify Universe</h1>
          <p className="text-muted fs-5 mb-5 p-2">
            Extend your trading and investment experience even further with our
            partner platforms.
          </p>
        </div>
      </div>

      <div className="row text-center g-5">
        <div className="col-md-4">
          <img
            src="media/smallcaseLogo.png"
            alt="Smallcase"
            className="img-fluid mb-3"
            style={{ height: "60px", width: "180px", objectFit: "contain" }}
          />
          <p className="text-muted">Thematic investment platform</p>
        </div>

        <div className="col-md-4">
          <img
            src="media/streakLogo.png"
            alt="Streak"
            className="img-fluid mb-3"
            style={{ height: "60px", width: "180px", objectFit: "contain" }}
          />
          <p className="text-muted">Algo & strategy platform</p>
        </div>

        <div className="col-md-4">
          <img
            src="media/sensibullLogo.svg"
            alt="Sensibull"
            className="img-fluid mb-3"
            style={{ height: "60px", width: "180px", objectFit: "contain" }}
          />
          <p className="text-muted">Options trading platform</p>
        </div>

        <div className="col-md-4">
          <img
            src="media/image.png"
            alt="Asset Management"
            className="img-fluid mb-3"
            style={{ height: "60px", width: "180px", objectFit: "contain" }}
          />
          <p className="text-muted">Asset Management</p>
        </div>

        <div className="col-md-4">
          <img
            src="media/goldenpiLogo.png"
            alt="GoldenPi"
            className="img-fluid mb-3"
            style={{ height: "60px", width: "180px", objectFit: "contain" }}
          />
          <p className="text-muted">Bonds trading platform</p>
        </div>

        <div className="col-md-4">
          <img
            src="media/dittoLogo.png"
            alt="Ditto"
            className="img-fluid mb-3"
            style={{ height: "60px", width: "180px", objectFit: "contain" }}
          />
          <p className="text-muted">Insurance</p>
        </div>
        <div className="text-center mt-5 p-5">
          <Link
            to="/signup"
            className="btn btn-primary px-4 py-2"
            style={{ minWidth: "180px" }}
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Universe;
