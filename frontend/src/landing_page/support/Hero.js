import React from 'react';


function Hero() {
    return (
        <div className="container-fluid py-5 text-white" style={{ background: 'linear-gradient(135deg, #387ed1 0%, #4a90e2 100%)' }}>
            <div className="container">
                <div className="row align-items-start g-5 py-5">
                    <div className="col-lg-6 col-md-12">
                        <h3 className="mb-3">Support Portal</h3>

                        <h1 className="mb-4">
                            Search for an answer or browse help topics to create a ticket
                        </h1>

                        <p className="border rounded p-3 mb-4">
                            Eg: How do I activate F&amp;O? Why is my order getting rejected?
                        </p>

                        <div className="d-flex flex-wrap gap-3">
                            <a href="/df" style={{ color: 'white' }}>
                                Track account opening
                            </a>
                            <a href="/df" style={{ color: 'white' }}>
                                Track segment activation
                            </a>
                            <a href="/df" style={{ color: 'white' }}>
                                Intraday
                            </a>
                            <a href="/df" style={{ color: 'white' }}>
                                Margins
                            </a>
                            <a href="/df" style={{ color: 'white' }}>
                                Kite User Manual
                            </a>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12">
                        <div className="d-flex justify-content-end mb-5">
                            <a href="/df" style={{ color: 'white' }}>
                                Track Tickets
                            </a>
                        </div>

                        <h2 className="mb-4">Featured</h2>

                        <ol className="ps-3">
                            <li>
                                <a href="/df" style={{ color: 'white' }}>
                                    Current Takeovers and Delisting - January 2026
                                </a>
                            </li>
                            <li>
                                <a href="/df" style={{ color: 'white' }}>
                                    Latest Intraday Leverages - MIS &amp; CO
                                </a>
                            </li>
                            <li>
                                <a href="/df" style={{ color: 'white' }}>
                                    Kite Platform Updates and Trading Changes
                                </a>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;