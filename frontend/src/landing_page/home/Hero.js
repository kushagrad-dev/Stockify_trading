import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <div className="container py-5">
            <div className="row text-center justify-content-center pt-5 mt-5">
                <div className="col-12">
                    <img
                        src="media/homeHero.png"
                        alt="Hero"
                        className="img-fluid mb-5"
                    />

                    <h1 className="mt-4 mb-4">Invest in everything</h1>

                    <p className="mb-4 fs-5">
                        Online platform to invest in stocks, derivatives, mutual funds, and more.
                    </p>

                    <Link
                        to="/signup"
                        style={{ width: '20%', minWidth: '180px', padding: '10px' }}
                        className="btn btn-primary mb-5"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Hero;
