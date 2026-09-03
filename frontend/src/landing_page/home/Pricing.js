import React from 'react';

function Pricing() {
    return (
        <div className="container py-5">
            <div className="row align-items-center pt-5 mt-5">
                <div className="col-lg-5 col-md-12 mb-5 mb-lg-0 pt-3">
                    <h1 className="mb-4">Unbeatable Pricing</h1>

                    <p className="mb-4">
                        We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.
                    </p>

                    <a
                        href="/pricing"
                        className="fs-5 d-inline-block"
                        style={{ fontWeight: 'bold', textDecoration: 'none' }}
                    >
                        View Plans &rarr;
                    </a>
                </div>

                <div className="col-lg-7 col-md-12 pt-3">
                    <div className="row text-center justify-content-center">
                        <div className="col-md-5 p-3 border mx-2 mb-3">
                            <h1>₹0</h1>
                            <p>Free equity delivery and direct mutual funds</p>
                        </div>

                        <div className="col-md-5 p-3 border mx-2 mb-3">
                            <h1>₹20</h1>
                            <p>Free equity delivery and direct mutual funds</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pricing;