import React from 'react';
import { useSelector } from 'react-redux'
import Navbar from '../components/Layout/Navbar';
import BannerSlider from '../components/shop-style-nine/BannerSlider';
import ProductCategories from '../components/shop-style-nine/ProductCategories';
import SpecialOffer from '../components/shop-style-nine/SpecialOffer';
import BestSellersProducts from '../components/shop-style-nine/BestSellersProducts';
import Facility from '../components/Common/Facility';
import Subscribe from '../components/Common/Subscribe';
import Partner from '../components/Common/Partner';
import InstagramPhoto from '../components/Common/InstagramPhoto';
import Footer from '../components/Layout/Footer';
import AddsModal from '../components/Modal/AddsModal';

const ShopStyleNine = () => {
    const products = useSelector((state) => state.products)
    const addedItemsToCompare = useSelector((state) => state.addedItemsToCompare)
    return (
        <div className="boxed-layout-wrapper">
            <div className="boxed-layout-content">
                <Navbar />
                <BannerSlider />
                <ProductCategories />
                <SpecialOffer products={products} CompareProducts={addedItemsToCompare} />
                <Facility />
                <BestSellersProducts products={products} CompareProducts={addedItemsToCompare} />
                <Subscribe />
                <Partner />
                <InstagramPhoto />
                <Footer /> 
                <AddsModal />
            </div>
        </div>
    );
}

export default ShopStyleNine;