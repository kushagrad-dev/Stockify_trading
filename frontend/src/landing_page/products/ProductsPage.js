import React from 'react';
import Hero from './Hero'
import LeftSection from './LeftSection'
import RightSection from './RightSection'
import Universe from './Universe'


function ProductsPage() {
  return (
    <div>
        <Hero />
        <LeftSection imageURL="media/kite.png" productName="Kite" productDescription="Our ultra-fast flagship platform with streaming market data, advances charts, an elegant UI , and more. Enjoy the Kite experience seamlessly on your Android and ios devices. " tryDemo="" learnMore="" googlePlay="" appStore="" />

        <RightSection imageURL="media/console.png" productName="Console" productDescription="The Central dashboard for your Zerodha Account. Gain Insights into your trades and investments with in-depth reports and visualisations "  learnMore="" />

        <LeftSection imageURL="media/coin.png" productName="Coin" productDescription="Buy direct mutual funds online,commission-free, delivered directly to your Demat account, Enjoy the investment experience on your Android and ios devices." tryDemo="" learnMore="" googlePlay="" appStore="" />

        <RightSection imageURL="media/kiteconnect.png" productName="Kite Connect API" productDescription=" Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs.If you are a startup, build your investment app and showcase it to our clientbase. "  learnMore="" />

        <LeftSection imageURL="media/Varsity.png" productName="Varsity mobile" productDescription="An easy to grasp,collection of stock market lesson with in-depth coverage and illusions.Content is broken down into bite-size cards to help you learn on the go" tryDemo="" learnMore="" googlePlay="" appStore="" />

        

        <Universe />

    </div>
  );
}

export default ProductsPage;