import React from 'react';
import { useSelector } from 'react-redux'
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import AddsModal from '../components/Modal/AddsModal';
import Banner from '../components/Electronics/Banner';
import RecentProducts from '../components/Electronics/RecentProducts';
import ProductOffer from '../components/Electronics/ProductOffer';
import TrendingProducts from '../components/Electronics/TrendingProducts';
import Facility from '../components/Electronics/Facility';
import BestSeller from '../components/Electronics/BestSellers';
import Partner from '../components/Common/Partner';
import News from '../components/Electronics/News';
import TestimonialsTwo from '../components/Common/TestimonialsTwo';
import Subscribe from '../components/Common/Subscribe';
import InstagramPhoto from '../components/Common/InstagramPhoto';

const Electronics = () => {
    const products = useSelector((state) => state.productsElectronics)
    const addedItemsToCompare = useSelector((state) => state.addedItemsToCompare)
    return (
        <>
            <Navbar />

            <Banner />

            <RecentProducts 
                products={products} 
                CompareProducts={addedItemsToCompare} 
            />

            <ProductOffer />

            <TrendingProducts 
                products={products} 
                CompareProducts={addedItemsToCompare} 
            />

            <Facility />

            <BestSeller 
                products={products} 
                CompareProducts={addedItemsToCompare} 
            />

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

export default Electronics;