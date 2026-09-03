import React from 'react';
import Hero from './Hero'
import Brockrage from './Brokerage'
import Openaccount from '../openaccount';


function PricingPage() {
    return (
        <div>
            <Hero/>
            <Openaccount />
            <Brockrage />

        </div>
    );
}

export default PricingPage;