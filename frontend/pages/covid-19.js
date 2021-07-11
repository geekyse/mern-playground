import React from 'react';
import { useSelector } from 'react-redux'
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import AddsModal from '../components/Modal/AddsModal';
import Banner from '../components/Covid19/Banner';
import RecentProducts from '../components/Covid19/RecentProducts';
import ProductOffer from '../components/Covid19/ProductOffer';
import TrendingProducts from '../components/Covid19/TrendingProducts';
import Facility from '../components/Covid19/Facility';
import BestSeller from '../components/Covid19/BestSellers';
import Partner from '../components/Common/Partner';
import News from '../components/Covid19/News';
import Subscribe from '../components/Common/Subscribe';
import InstagramPhoto from '../components/Covid19/InstagramPhoto';

const Covid19 = () => {
    const products = useSelector((state) => state.productsCovid19)
    const addedItemsToCompare = useSelector((state) => state.addedItemsToCompare)
    return (
        <>
            <Navbar />

            <Banner />

            <RecentProducts products={products} CompareProducts={addedItemsToCompare} />

            <ProductOffer />

            <TrendingProducts products={products} CompareProducts={addedItemsToCompare} />

            <Facility />

            <BestSeller products={products} CompareProducts={addedItemsToCompare} />

            <Partner />

            <News />

            <Subscribe />

            <InstagramPhoto />

            <Footer />
            
            <AddsModal />
        </>
    );
}

export default Covid19;
