import React, { Component } from 'react';
import { useSelector } from 'react-redux'
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import Breadcrumb from '../components/Common/Breadcrumb';
import Facility from '../components/Common/Facility';
import LeftSidebar from '../components/Sidebar/LeftSidebar';
import ProductsFilterOptions from '../components/Common/ProductsFilterOptions';
import ProductsCard from '../components/products/ProductsCard';

const hookClass = (props) => {
    const products = useSelector((state) => state.products)
    const addedItemsToCompare = useSelector((state) => state.addedItemsToCompare)
    return <Index {...props} products={products} CompareProducts={addedItemsToCompare} />
}

class Index extends Component {

    state = {
        gridClass: ''
    }

    handleGrid = (e) => {
        this.setState({
            gridClass: e
        });
    }

    render() {
        let { gridClass } = this.state;
        let { products, CompareProducts } = this.props;
        return (
            <>
                <Navbar />
                
                <Breadcrumb title="Women's" />

                <section className="products-collections-area ptb-60">
                    <div className="container-fluid">
                        <div className="section-title">
                            <h2><span className="dot"></span> Women's</h2>
                        </div>

                        <div className="row">
                            <LeftSidebar col={3} />

                            <div className="col-lg-9 col-md-12">
                                <ProductsFilterOptions onClick={this.handleGrid} />

                                <div id="products-filter" className={`products-collections-listing row ${gridClass}`}>
                                    <ProductsCard products={products} CompareProducts={CompareProducts} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Facility />

                <Footer />
            </>
        );
    }
}

export default hookClass;
