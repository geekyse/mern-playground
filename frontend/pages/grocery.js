import React from 'react';
import { useSelector } from 'react-redux'
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import AddsModal from '../components/Modal/AddsModal';
import Banner from '../components/Grocery/Banner';
import RecentProducts from '../components/Grocery/RecentProducts';
import ProductOffer from '../components/Grocery/ProductOffer';
import TrendingProducts from '../components/Grocery/TrendingProducts';
import Facility from '../components/Grocery/Facility';
import BestSeller from '../components/Grocery/BestSellers';
import Partner from '../components/Common/Partner';
import News from '../components/Grocery/News';
import Subscribe from '../components/Common/Subscribe';
import InstagramPhoto from '../components/Common/InstagramPhoto';

const Grocery = () => {
    const products = useSelector((state) => state.productsGrocery)
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

export default Grocery;
