import React, { Component } from 'react';
import Link from 'next/link';

class ProductCategories extends Component {
    render() {
        return (
            <section className="category-boxes-area pt-60">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 col-sm-6">
                            <div className="category-boxes">
                                <img src={require("../../images/category-product-image/cp-img9.jpg")} alt="image" />

                                <div className="content black-text">
                                    <p>Don’t Miss Today’s Featured Deals</p>
                                    <h3>50% OFF</h3>

                                    <Link href="#">
                                        <a className="shop-now-btn">Discover Now</a>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-sm-6">
                            <div className="category-boxes">
                                <img src={require("../../images/category-product-image/cp-img10.jpg")} alt="image" />

                                <div className="content black-text">
                                    <p>New Personalizable Collection</p>
                                    <h3>Need It Now</h3>
                                    
                                    <Link href="#">
                                        <a className="shop-now-btn">Discover Now</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ProductCategories;