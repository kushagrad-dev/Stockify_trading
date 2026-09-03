import React from 'react';

function Brokerage() {
    return (
        <div className="container my-5">
            <div className="row border-top pt-4 align-items-start">
                <div className="col-lg-8 col-md-7 p-4">
                    <a href='/' style={{ textDecoration: 'none' }}>
                        <h3 className='fs-4 mb-4'>Brokerage Calculator</h3>
                    </a>
                    <ul style={{ textAlign: 'left', lineHeight: '1.8' }} className="text-muted fs-6 ps-3">
                        <li>call & Trade and RMS auto-squareoff:Additional charges of ₹50 + GST per order</li>
                        <li>Digital contract notes will be sent via e-mail</li>
                        <li>Physical copies of contract notes, if required , shall be charged ₹20 per contract note. Courier charges apply.</li>
                        <li>For NRI account(non-PIS), 0.5% or ₹100 per executed order for equity (whichever is lower) </li>
                        <li>For NRI account(non-PIS),0.5% or ₹200 per executed order for equity(Whichever is lower) </li>
                        <li>if the account is in debit balance, any other placed will be charged ₹40 per executed order instead of ₹20 per executed order</li>
                    </ul>

                </div>
                <div className="col-lg-4 col-md-5 p-4">
                    <a href='/' style={{ textDecoration: 'none' }}>
                        <h3 className='fs-4 mb-4'>List of Charges</h3>
                    </a>
                    <ul className='text-muted fs-6 ps-3' style={{ lineHeight: '1.8' }}>
                        <li>Equity Delivery</li>
                        <li>Equity Intraday</li>
                        <li>F&O Trading</li>
                        <li>Currency Trading</li>
                        <li>Commodity Trading</li>
                        <li>Account Maintenance Charges</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Brokerage;
