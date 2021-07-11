import React, { Component } from 'react';
import Link from 'next/link';

class CategoryTypes extends Component {
    render() {
        return (
            <section className="category-boxes-area pt-60">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-category-boxes">
                                <img src={require("../../images/category-products-img5.jpg")} alt="image" />

                                <h3>Bags</h3>
                                
                                <Link href="/category-without-sidebar">
                                    <a className="shop-now-btn">Shop Now</a>
                                </Link>
                                <Link href="/category-without-sidebar">
                                    <a className="link-btn"></a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-category-boxes">
                                <img src={require("../../images/category-products-img6.jpg")} alt="image" />

                                <h3>Shoes</h3>

                                <Link href="/collections-style-one">
                                    <a className="shop-now-btn">Shop Now</a>
                                </Link>

                                <Link href="/collections-style-one">
                                    <a className="link-btn"></a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-category-boxes">
                                <img src={require("../../images/category-products-img7.jpg")} alt="image" />

                                <h3>Watches</h3>

                                <Link href="/category-left-sidebar-with-block">
                                    <a className="shop-now-btn">Shop Now</a>
                                </Link>

                                <Link href="/category-left-sidebar-with-block">
                                    <a className="link-btn"></a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-category-boxes">
                                <img src={require("../../images/category-products-img8.jpg")} alt="image" />

                                <h3>Glasses</h3>

                                <Link href="/category-right-sidebar-with-block">
                                    <a className="shop-now-btn">Shop Now</a>
                                </Link>

                                <Link href="/category-right-sidebar-with-block">
                                    <a className="link-btn"></a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default CategoryTypes;