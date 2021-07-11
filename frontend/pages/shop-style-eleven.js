import React from 'react';
import { useSelector } from 'react-redux'
import Navbar from '../components/Layout/Navbar';
import BannerSlider from '../components/shop-style-eleven/BannerSlider';
import ProductCategories from '../components/shop-style-eleven/ProductCategories';
import SpecialOffer from '../components/shop-style-eleven/SpecialOffer';
import Facility from '../components/Common/Facility';
import BestSellersProducts from '../components/shop-style-eleven/BestSellersProducts';
import Subscribe from '../components/Common/Subscribe';
import Partner from '../components/Common/Partner';
import InstagramPhoto from '../components/Common/InstagramPhoto';
import Footer from '../components/Layout/Footer';
import AddsModal from '../components/Modal/AddsModal';

const ShopStyleEleven = () => {
    const products = useSelector((state) => state.products)
    const addedItemsToCompare = useSelector((state) => state.addedItemsToCompare)
    return (
        <>
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
        </>
    );
}

export default ShopStyleEleven;