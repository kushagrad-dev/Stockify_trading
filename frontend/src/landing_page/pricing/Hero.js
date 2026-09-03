import React from 'react';

function Hero() {
    return (
        <div className="container">
            <div className='row p-5 mt-5 mb-5 border-bottom text-center'>
                <h1> Pricing </h1>
                <h3 className='text-muted fs-5'>
                    Free equity investments and flat ₹20 intraday and F&O trades
                </h3>
                <br></br>
            </div>
            <div className='row text-center mt-5 p-5 border-bottom'>
                <div className='col-4'>
                    <img src='media/pricing0.svg' alt='Free equity delivery' className='img-fluid mb-3' />
                    <h1>Free equity delivery
                    </h1>
                    <p>All equity delivery investments(NSE,BSE),
                        <br></br>
                         are absolutely free - ₹0 brokerage
                    </p>
 
                </div>
                <div className='col-4'>
                    <img src='media/intradayTrades.svg' alt='Intraday and F&O pricing' className='img-fluid mb-3' />
                    <h1> Intraday and F&O trades</h1>
                    <p>Flat Rs. 20 or 0.03% (Whichever is lower)
                        <br></br>
                         per executed order on intraday trades
                        <br></br>
                        across equity, currency, and commodity trades
                    </p>

                </div>
                <div className='col-4'>
                    <img src='media/pricing0.svg' alt='Free direct mutual funds' className='img-fluid mb-3' />
                    <h1>Free direct MF</h1>
                    <p>All direct Mutual Funds
                        <br></br>
                        Are absolutely free - ₹0 fee
                    </p>

                </div>
            </div>

        </div>
    );
}

export default Hero;