import React, { Component } from 'react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import Facility from '../components/Common/Facility';
import Breadcrumb from '../components/Common/Breadcrumb';
import CartContent from '../components/cart/CartContent';

class Index extends Component {
    render() {
        return (
            <>
                <Navbar />

                <Breadcrumb title="Cart" />

                <CartContent />

                <Facility />
                
                <Footer />
            </>
        );
    }
}

export default Index;
