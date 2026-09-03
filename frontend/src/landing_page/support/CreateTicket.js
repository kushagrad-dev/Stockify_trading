import React from 'react';


function CreateTicket() {
    return (
        <div className='container py-5'>
            <h1 className='fs-2 fw-bold text-center pt-4 mb-5 border-top'>To create a ticket, select a relevant topic</h1>
            <div className='row g-4 justify-content-center'>
                <div className='col-lg-4 col-md-6 d-flex mb-3'>
                    <div className='w-100 p-4 h-100 bg-white border rounded shadow-sm'>
                        <h4 className='mb-4 d-flex align-items-center fw-semibold border-bottom pb-3'>
                            <i className="fa fa-plus-circle me-2" aria-hidden="true"></i>
                            Account Opening
                        </h4>
                        <div className='d-flex flex-column gap-1'>
                            <a href='/fdf' style={{ textDecoration: 'none', lineHeight: '2', padding: '2px 0' }}>Online Account Opening</a>
                            <a href='/fdf' style={{ textDecoration: 'none', lineHeight: '2', padding: '2px 0' }}>Offline Account Opening</a>
                            <a href='/fdf' style={{ textDecoration: 'none', lineHeight: '2', padding: '2px 0' }}>Company, Partnership and HUF Account Opening</a>
                            <a href='/fdf' style={{ textDecoration: 'none', lineHeight: '2', padding: '2px 0' }}>NRI Account Opening</a>
                            <a href='/fdf' style={{ textDecoration: 'none', lineHeight: '2', padding: '2px 0' }}>Charges at Zerodha</a>
                            <a href='/fdf' style={{ textDecoration: 'none', lineHeight: '2', padding: '2px 0' }}>Zerodha IDFC FIRST Bank 3-in-1 Account</a>
                            <a href='/fdf' style={{ textDecoration: 'none', lineHeight: '2', padding: '2px 0' }}>Getting Started</a>
                        </div>
                    </div>
                </div>

                <div className='col-lg-4 col-md-6 d-flex mb-3'>
                    <div className='w-100 p-4 h-100 bg-white border rounded shadow-sm'>
                        <h4 className='mb-4 d-flex align-items-center fw-semibold border-bottom pb-3'>
                            <i className="fa fa-user-o me-2" aria-hidden="true"></i>
                            Your Stockify Account
                        </h4>
                        <div className='d-flex flex-column gap-1'>
                            <a href='/fdf' style={{ textDecoration: 'none', lineHeight: '2', padding: '2px 0' }}>Login Credentials</a>
                            <a href='/fdf' style={{ textDecoration: 'none', lineHeight: '2', padding: '2px 0' }}>Account Modification and Segment Addition</a>
                            <a href='/fdf' style={{ textDecoration: 'none', lineHeight: '2', padding: '2px 0' }}>DP ID and Bank Details</a>
                            <a href='/fdf' style={{ textDecoration: 'none', lineHeight: '2', padding: '2px 0' }}>Your Profile</a>
                            <a href='/fdf' style={{ textDecoration: 'none', lineHeight: '2', padding: '2px 0' }}>Transfer and conversion of shares</a>
                        </div>
                    </div>
                </div>

                <div className='col-lg-4 col-md-6 d-flex mb-3'>
                    <div className='w-100 p-4 h-100 bg-white border rounded shadow-sm'>
                        <h4 className='mb-4 d-flex align-items-center fw-semibold border-bottom pb-3'>
                            <i className="fa fa-bar-chart me-2" aria-hidden="true"></i>
                            Your Account
                        </h4>
                        <div className='d-flex flex-column gap-1'>
                            <a href='/fdf' style={{ textDecoration: 'none', lineHeight: '2', padding: '2px 0' }}>Margin/leverage, Product and Order types</a>
                            <a href='/fdf' style={{ textDecoration: 'none', lineHeight: '2', padding: '2px 0' }}>Kite Web and Mobile</a>
                            <a href='/fdf' style={{ textDecoration: 'none', lineHeight: '2', padding: '2px 0' }}>Trading FAQs</a>
                            <a href='/fdf' style={{ textDecoration: 'none', lineHeight: '2', padding: '2px 0' }}>Corporate Actions</a>
                            <a href='/fdf' style={{ textDecoration: 'none', lineHeight: '2', padding: '2px 0' }}>Sentinel</a>
                            <a href='/fdf' style={{ textDecoration: 'none', lineHeight: '2', padding: '2px 0' }}>Kite API</a>
                            <a href='/fdf' style={{ textDecoration: 'none', lineHeight: '2', padding: '2px 0' }}>Pi and other platform</a>
                            <a href='/fdf' style={{ textDecoration: 'none', lineHeight: '2', padding: '2px 0' }}>Stockreports+</a>
                            <a href='/fdf' style={{ textDecoration: 'none', lineHeight: '2', padding: '2px 0' }}>GTT</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateTicket;