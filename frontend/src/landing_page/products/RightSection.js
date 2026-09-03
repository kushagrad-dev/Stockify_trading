import React from 'react';

function RightSection({imageURL,
  productName,
  productDescription,
  learnMore
}) {
    return (
        <div className="container py-5 my-5">
            <div className="row align-items-center g-5">
                <div className="col-lg-6 order-2 order-lg-1">
                    <h1 className="fw-bold mb-4">{productName}</h1>

                    <p className="text-muted fs-5 mb-4">
                        {productDescription}
                    </p>

                    <a
                        href={learnMore}
                        className="text-decoration-none fw-semibold"
                    >
                        Learn More →
                    </a>
                </div>

                <div className="col-lg-6 text-center order-1 order-lg-2">
                    <img
                        src={imageURL}
                        alt={productName}
                        className="img-fluid"
                    />
                </div>
            </div>
        </div>
    );
}

export default RightSection;