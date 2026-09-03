import React from 'react';
import { Link } from 'react-router-dom';

function openaccount() {
    return (
        <div className="container py-5">
            <div className="row text-center justify-content-center pt-5 mt-5">
                <div className="col-12">
                    

                    <h1 className="mt-4 mb-4">Open Your Stockify Account</h1>

                    <p className="mb-4 fs-5">
                        Modern platforms and apps,₹0 investment, and flat ₹20 intraday and F&O trades.
                    </p>

                    <Link
                        to="/signup"
                        style={{ width: '20%', minWidth: '180px', padding: '10px' }}
                        className="btn btn-primary mb-5"
                    >
                        Sign Up Now
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default openaccount;
