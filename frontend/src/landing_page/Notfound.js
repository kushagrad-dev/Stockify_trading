import React from 'react';

function Notfound() {
    return (
        <div className="container py-5">
            <div className="row text-center justify-content-center pt-5 mt-5">
                <div className="col-12">
                    

                    <h1 className="mt-4 mb-4">Page Not Found</h1>

                    <p className="mb-4 fs-5">
                        Error 404: Sorry, the page you're looking for doesn't exist.
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Notfound;