import React, { Component } from 'react';
import Link from 'next/link';

class ProductCategories extends Component {
    render() {
        return (
            <section className="category-boxes-area pt-60">
                <div className="container">
                    <div className="section-title">
                        <h2><span className="dot"></span> Alow your style to match your ambition!</h2>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-sm-6">
                            <div className="category-boxes">
                                <img src={require("../../images/category-product-image/cp-img1.jpg")} alt="image" />
                                <div className="content">
                                    <h3>Shop for Woman</h3>
                                    <span>165 Products</span>

                                    <Link href="#">
                                        <a className="shop-now-btn">Shop Now</a>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="category-boxes">
                                <img src={require("../../images/category-product-image/cp-img2.jpg")} alt="image" />
                                <div className="content">
                                    <h3>Shop for Man</h3>
                                    <span>165 Products</span>
                                    
                                    <Link href="#">
                                        <a className="shop-now-btn">Shop Now</a>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="category-boxes">
                                <img src={require("../../images/category-product-image/cp-img3.jpg")} alt="image" />
                                <div className="content">
                                    <h3>Shop for Man & Woman</h3>
                                    <span>165 Products</span>
                                    
                                    <Link href="#">
                                        <a className="shop-now-btn">Shop Now</a>
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