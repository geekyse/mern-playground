import React from 'react';
import { useSelector } from 'react-redux'
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import AddsModal from '../components/Modal/AddsModal';
import News from '../components/Common/News';
import Subscribe from '../components/Common/Subscribe';
import Partner from '../components/Common/Partner';
import InstagramPhoto from '../components/Common/InstagramPhoto';
import Banner from '../components/shop-style-four/Banner';
import Facility from '../components/shop-style-four/Facility';
import TrendingProducts from '../components/shop-style-four/TrendingProducts';
import BestSeller from '../components/shop-style-four/BestSellers';
import OfferArea from '../components/shop-style-four/OfferArea';

const ShopStyleFour = () => {
    const products = useSelector((state) => state.products)
    const addedItemsToCompare = useSelector((state) => state.addedItemsToCompare)
    return (
        <>
            <Navbar />

            <Banner />

            <Facility />

            <TrendingProducts products={products} CompareProducts={addedItemsToCompare} />

            <BestSeller products={products.slice(0, 8)} CompareProducts={addedItemsToCompare} />

            <OfferArea />

            <News />

            <Subscribe />

            <Partner />

            <InstagramPhoto />

            <Footer />
            
            <AddsModal />
        </>
    );
}

export default ShopStyleFour;
