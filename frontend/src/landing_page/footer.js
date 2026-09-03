import React from 'react';

function Footer() {
    return (
        <footer className="container-fluid border-top mt-5 py-5 bg-light">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 mb-4">
                        <h4 className="fw-bold">Stockify</h4>
                        <p className="text-muted mb-0">
                            Smart investing made simple. Track markets, explore
                            opportunities, and grow your financial knowledge with
                            confidence.
                        </p>
                    </div>

                    <div className="col-lg-2 col-md-4 mb-4">
                        <h6 className="fw-bold">Company</h6>
                        <ul className="list-unstyled">
                            <li><a href="/about" className="text-decoration-none text-muted">About</a></li>
                            <li><a href="/products" className="text-decoration-none text-muted">Products</a></li>
                            <li><a href="/pricing" className="text-decoration-none text-muted">Pricing</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-2 col-md-4 mb-4">
                        <h6 className="fw-bold">Support</h6>
                        <ul className="list-unstyled">
                            <li><a href="/support" className="text-decoration-none text-muted">Help Center</a></li>
                            <li><a href="/contact" className="text-decoration-none text-muted">Contact Us</a></li>
                            <li><a href="/signup" className="text-decoration-none text-muted">Get Started</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-4 col-md-4 mb-4">
                        <h6 className="fw-bold">Connect</h6>
                        <p className="text-muted mb-2">Follow Stockify for updates and market insights.</p>
                        <div className="d-flex gap-3">
                            <a href="/" className="text-decoration-none">LinkedIn</a>
                            <a href="/" className="text-decoration-none">X</a>
                            <a href="/" className="text-decoration-none">Instagram</a>
                        </div>
                    </div>
                </div>

                <hr />

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <p className="mb-2 mb-md-0 text-muted">
                        © 2026 Stockify. All rights reserved.
                    </p>
                    <div>
                        <a href="/privacy" className="text-decoration-none text-muted me-3">Privacy Policy</a>
                        <a href="/terms" className="text-decoration-none text-muted">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;