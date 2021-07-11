import React from 'react';
import { useSelector } from 'react-redux'
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import AddsModal from '../components/Modal/AddsModal';
import Banner from '../components/shop-style-two/Banner';
import OfferArea from '../components/shop-style-two/OfferArea';
import Products from '../components/shop-style-two/Products';
import CategoryProducts from '../components/shop-style-two/CategoryProducts';
import TrendingProducts from '../components/shop-style-two/TrendingProducts';
import BestSeller from '../components/shop-style-two/BestSellers';
import Facility from '../components/shop-style-two/Facility';
import Testimonials from '../components/Common/Testimonials';
import News from '../components/Common/News';
import Subscribe from '../components/Common/Subscribe';
import Partner from '../components/Common/Partner';
import InstagramPhoto from '../components/Common/InstagramPhoto';

const ShopStyleTwo = () => {
    const products = useSelector((state) => state.products)
    const addedItemsToCompare = useSelector((state) => state.addedItemsToCompare)
    return (
        <>
            <Navbar />

            <Banner />

            <OfferArea />

            <Products products={products} CompareProducts={addedItemsToCompare} />

            <CategoryProducts />

            <TrendingProducts products={products} CompareProducts={addedItemsToCompare} />

            <BestSeller products={products} CompareProducts={addedItemsToCompare} />

            <Facility />

            <Testimonials />
            
            <News />

            <Subscribe />

            <Partner />

            <InstagramPhoto />

            <Footer />
            
            <AddsModal />
        </>
    );
}

export default ShopStyleTwo;
