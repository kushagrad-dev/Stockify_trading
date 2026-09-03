import React from 'react';

function Hero() {
    return (
        <div className="container py-5 my-5 text-center">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <h1 className="display-4 fw-bold mb-4">Technology</h1>
                    <h3 className="text-muted mb-4">
                        Sleek, modern and intuitive trading platforms
                    </h3>
                    <div className="lead">
                        Check out our{' '}
                        <a href="/" style={{ textDecoration: 'none' }}>
                            investment offerings
                        </a>{' '}
                        <i className="fa fa-long-arrow-right p-3" aria-hidden="true"></i>

                        <hr className="mt-5 mb-5 " />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;    
