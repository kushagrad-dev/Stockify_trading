import React from 'react';

function Hero() {
    return(
        <div className="container py-5 my-5">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <h3 className="text-center mt-5 mb-5 pb-4 lh-base">
                        We pioneered the discount broking model in India.
                        <br></br>
                        Now, we are breaking ground with our technology.
                    </h3>
                </div>
            </div>

            <div className="row justify-content-center gx-5 gy-4 align-items-start mt-4">
                <div className="col-lg-5 col-md-5 px-lg-4">
                    <div className="text-muted" style={{ lineHeight: '1.9', textAlign: 'justify', fontSize: '1rem' }}>
                        <p>
                            We kick-started operations on the 15th of August, 2010 with the goal of breaking all barriers that traders and investors face in India in terms of cost, support, and technology.
                        </p>

                        <p>
                            We named the company Stockify to reflect our vision of making investing accessible to everyone, everywhere.
                        </p>

                        <p>
                            We are proud to have pioneered the concept of discount broking and price transparency in India, and we continue to innovate and push the boundaries of what's possible in the world of finance.
                        </p>

                        <p className="mb-0">
                            We are committed to providing our customers with the best possible experience, and we are constantly working to improve our platform and services to meet their needs.
                        </p>
                    </div>
                </div>

                <div className="col-lg-1 col-md-1"></div>

                <div className="col-lg-5 col-md-5 px-lg-4 mr-1">
                    <p className="text-muted mb-4" style={{ lineHeight: '1.9', textAlign: 'justify', fontSize: '1rem' }}>
                        In addition, we run a number of popular open online educational and community initiatives to empower retail traders and investors.
                    </p>

                    <p className="text-muted mb-4" style={{ lineHeight: '1.9', textAlign: 'justify', fontSize: '1rem' }}>
                        Rainmatter,our fintech incubator and accelerator, has supported over 100 startups in the fintech space, helping to foster innovation and growth in the industry.
                    </p>

                    <p className="text-muted mb-4" style={{ lineHeight: '1.9', textAlign: 'justify', fontSize: '1rem' }}>
                        And yet, we are always up to something new. Every day, catch up on the latest updates on our blog or social media channels, and stay tuned for more exciting developments from Stockify.
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Hero;