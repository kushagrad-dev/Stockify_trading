import React from 'react';
import Awards from './awards';
import Education from './education';
import Pricing from './Pricing';
import Stats from './stats';
import Hero from './Hero';     
import OpenAccount from '../openaccount';

function HomePage() {
    return (
        <>
            
            <Hero />
            <Awards />
            <Stats />
            <Pricing />
            <Education />
            <OpenAccount />
        </>
    );
}

export default HomePage;
