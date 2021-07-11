import React from 'react';
import { useSelector } from 'react-redux'
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import AddsModal from '../components/Modal/AddsModal';
import Banner from '../components/Furniture/Banner';
import RecentProducts from '../components/Furniture/RecentProducts';
import ProductOffer from '../components/Furniture/ProductOffer';
import TrendingProducts from '../components/Furniture/TrendingProducts';
import Facility from '../components/Furniture/Facility';
import BestSeller from '../components/Furniture/BestSellers';
import Partner from '../components/Common/Partner';
import News from '../components/Common/News';
import TestimonialsTwo from '../components/Common/TestimonialsTwo';
import Subscribe from '../components/Common/Subscribe';
import InstagramPhoto from '../components/Common/InstagramPhoto';

const Furniture = () => {
    const products = useSelector((state) => state.productsFurniture)
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

            <TestimonialsTwo />

            <News />

            <Subscribe />

            <InstagramPhoto />

            <Footer />
            
            <AddsModal />
        </>
    );
}

export default Furniture;