import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container py-5 my-5">
      <div className="row align-items-center g-5">
        <div className="col-lg-6 text-center">
          <img src={imageURL} alt={productName} className="img-fluid" />
        </div>

        <div className="col-lg-6">
          <h1 className="fw-bold mb-4">{productName}</h1>

          <p className="text-muted fs-5 mb-4">{productDescription}</p>

          <div className="mb-4">
            <a href={tryDemo} className="text-decoration-none fw-semibold">
              Try Demo
            </a>

            <a
              href={learnMore}
              className="text-decoration-none fw-semibold ms-4"
            >
              Learn More
            </a>
          </div>

          <div className="d-flex align-items-center gap-3 flex-wrap">
            <a href={googlePlay}>
              <img
                src="media/googlePlayBadge.svg"
                alt="Google Play"
                className="img-fluid"
              />
            </a>

            <a href={appStore} className="text-decoration-none">
              <img
                src="media/appstoreBadge.svg"
                alt="App Store"
                className="img-fluid"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
