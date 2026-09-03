import React from 'react';

function Education() {
    return (
        <div className="container py-5 my-4">
            <div className="row align-items-center justify-content-between pt-3 mt-3">
                <div className="col-lg-6 col-md-12 text-center mb-4 mb-lg-0 pt-3">
                    <img
                        src="media/education.svg"
                        alt="Education"
                        className="img-fluid px-lg-4"
                    />
                </div>

                <div className="col-lg-5 col-md-12 pt-3">
                    <h1 className="mb-4">
                        Free and open market education
                    </h1>

                    <p className="mb-4">
                        Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.
                    </p>

                    <a
                        href="/varsity"
                        className="fs-5 d-inline-block mb-4"
                        style={{ fontWeight: 'bold', textDecoration: 'none' }}
                    >
                        Explore Varsity &rarr;
                    </a>

                    <p>
                        Trading Q&A, the most active trading and investment community in India for all your market related queries.
                    </p>
                    <a href="/Trading_Q&A" className="fs-5 d-inline-block mb-4" style={{ fontWeight: 'bold', textDecoration: 'none' }}>
                        Explore Trading Q&A &rarr;
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Education;