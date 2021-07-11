import React from 'react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import Facility from '../components/Common/Facility';
import Breadcrumb from '../components/Common/Breadcrumb';
import Content from '../components/compare/Content';
import { useSelector } from 'react-redux'

const Compare = () => {
    const products = useSelector((state) => state.addedItemsToCompare)
    return (
        <>
            <Navbar />

            <Breadcrumb title="Compare" />
            
            <Content compare_products={products} />

            <Facility />
            
            <Footer />
        </>
    );
}

export default Compare;