import React from 'react';
import { useSelector } from 'react-redux'
import NavbarTwo from '../components/Layout/NavbarTwo';
import BannerSlider from '../components/shop-style-five/BannerSlider';
import Facility from '../components/shop-style-five/Facility';
import CategoryTypes from '../components/shop-style-five/CategoryTypes';
import ProductsOffer from '../components/shop-style-five/ProductsOffer';
import News from '../components/Common/News';
import Partner from '../components/Common/Partner';
import Subscribe from '../components/Common/Subscribe';
import InstagramPhoto from '../components/Common/InstagramPhoto';
import Footer from '../components/Layout/Footer';
import AddsModal from '../components/Modal/AddsModal';
import Products from '../components/shop-style-five/Products';

const ShopStyleFive = () => {
    const products = useSelector((state) => state.products)
    const addedItemsToCompare = useSelector((state) => state.addedItemsToCompare)
    return (
        <>
            <NavbarTwo />

            <BannerSlider />

            <Facility />

            <CategoryTypes />

            <Products products={products} CompareProducts={addedItemsToCompare} />

            <ProductsOffer />

            <News />

            <Partner />

            <Subscribe />

            <InstagramPhoto />

            <Footer />
            
            <AddsModal />
        </>
    );
}

export default ShopStyleFive;