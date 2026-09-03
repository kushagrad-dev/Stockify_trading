import React from 'react';

function Team() {
    return(
        <div className="container py-5 my-5">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <hr />
                    <h1 className="text-center mt-5 mb-3 pb-2 lh-base">
                        Meet the Founder
                    </h1>

                    <p className="text-center text-muted mb-5 fs-5">
                        Building the future of investing through technology, innovation, and continuous learning.
                    </p>
                </div>
            </div>

            <div className="row justify-content-center gx-5 gy-4 align-items-center mt-4">
                <div className="col-lg-5 col-md-5 px-lg-4"> 
                    <div
                        className="text-muted text-center p-4"
                        style={{
                            borderRadius: '20px',
                            backgroundColor: '#fafafa',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
                        }}
                    >
                        <img
                            src="media/profile_photo.png"
                            alt="Team Member"
                            style={{
                                borderRadius: "50%",
                                width: "320px",
                                height: "320px",
                                objectFit: "cover",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                                border: "6px solid #fff"
                            }}
                        />
                        <h3 className='text-center mt-4 fw-bold'>
                            Kushagra Dubey
                        </h3>
                        <h5 className='text-muted mb-4'>
                            Founder & CEO
                        </h5>
                        <p className="text-primary fw-semibold">
                            Full Stack Developer • Finance Enthusiast • Entrepreneur
                        </p>
                    </div>
                </div>

                <div className="col-lg-1 col-md-1"></div>

                <div className="col-lg-5 col-md-5 px-lg-4 mr-1" style={{ lineHeight: '1.9', fontSize: '1.05rem' }}>
                    <p>
                        I am Kushagra Dubey, the founder of Stockify and a passionate technology enthusiast. My goal is to simplify investing and make financial markets more accessible for everyone through technology-driven solutions.
                    </p>

                    <p>
                        I am currently pursuing my studies while actively building projects in web development, finance, and software engineering. I enjoy transforming ideas into products that solve real-world problems and create value for users.
                    </p>

                    <p>
                        Beyond academics and entrepreneurship, I am constantly learning new technologies, exploring financial markets, and working on innovative solutions that can help individuals make smarter investment decisions.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Team;