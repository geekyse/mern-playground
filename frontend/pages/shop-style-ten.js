import React from 'react';
import { useSelector } from 'react-redux'
import Navbar from '../components/Layout/Navbar';
import BannerSlider from '../components/shop-style-ten/BannerSlider';
import ProductCategories from '../components/shop-style-ten/ProductCategories';
import SpecialOffer from '../components/shop-style-ten/SpecialOffer';
import ProductsCategoryStyleTwo from '../components/shop-style-ten/ProductsCategoryStyleTwo';
import TrendingProducts from '../components/shop-style-ten/TrendingProducts';
import Facility from '../components/Common/Facility';
import BestSellersProducts from '../components/shop-style-ten/BestSellersProducts';
import TestimonialsTwo from '../components/Common/TestimonialsTwo';
import NewsThree from '../components/Common/NewsThree';
import Subscribe from '../components/Common/Subscribe';
import Partner from '../components/Common/Partner';
import InstagramPhoto from '../components/Common/InstagramPhoto';
import Footer from '../components/Layout/Footer';
import AddsModal from '../components/Modal/AddsModal';

const ShopStyleTen = () => {
    const products = useSelector((state) => state.products)
    const addedItemsToCompare = useSelector((state) => state.addedItemsToCompare)
    return (
        <>
            <Navbar />

            <BannerSlider />

            <ProductCategories />

            <SpecialOffer products={products} CompareProducts={addedItemsToCompare} />

            <ProductsCategoryStyleTwo />

            <TrendingProducts products={products} CompareProducts={addedItemsToCompare} />

            <Facility />
            
            <BestSellersProducts products={products} CompareProducts={addedItemsToCompare} />

            <TestimonialsTwo />

            <NewsThree />

            <Subscribe />

            <Partner />

            <InstagramPhoto />

            <Footer /> 
            
            <AddsModal />
        </>
    );
}

export default ShopStyleTen;