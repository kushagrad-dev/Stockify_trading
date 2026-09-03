import React from 'react';
import { Link } from 'react-router-dom';


// link is used to link to different pages in the application without reloading the page,
//  it is a component provided by react-router-dom and not anchor tag which is used in html to link to different pages 
// and it reloads the page when clicked

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom fixed-top shadow-sm">
            <div className="container-fluid">
                <a className="navbar-brand fw-bold d-flex align-items-center" href="/">
                    <img src="media/stockify_logo_large.svg" alt="Stockify Logo" width="48" height="48" className="d-inline-block me-2" />
                    Stockify
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/signup">
                                Signup
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/login">
                                Login
                            </Link>
                        </li>

                        <li className="nav-item active">
                            <Link className="nav-link" to="/about">
                                About
                            </Link>
                        </li>

                        <li className="nav-item active">
                            <Link className="nav-link" to="/products">
                                Products
                            </Link>
                        </li>

                        <li className="nav-item active">
                            <Link className="nav-link" to="/pricing">
                                Pricing
                            </Link>
                        </li>

                        <li className="nav-item active">
                            <Link className="nav-link" to="/support">
                                Support
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
