import React, { Component } from 'react';
import Link from 'next/link';

class ProductOffer extends Component {
    render() {
        return (
            <div className="categories-banner-area pt-60 pb-30 bg-fcfbfb">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6">
                            <div className="offer-categories-box left-categories hover-active">
                                <img src={require("../../images/electronics-category1.jpg")} alt="image" />

                                <div className="content">
                                    <span>50% OFF</span> 
                                    <h3>Smart Watch</h3>

                                    <Link href="#">
                                        <a className="btn btn-primary">Shop Now</a>
                                    </Link>
                                </div>

                                <Link href="#">
                                    <a className="link-btn"></a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="offer-categories-box left-categories hover-active">
                                <img src={require("../../images/electronics-category2.jpg")} alt="image" />

                                <div className="content">
                                    <span>40% OFF</span>
                                    <h3>Mobile</h3>
                                    
                                    <Link href="#">
                                        <a className="btn btn-primary">Shop Now</a>
                                    </Link>
                                </div>
                                
                                <Link href="#">
                                    <a className="link-btn"></a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="offer-categories-box left-categories hover-active">
                                <img src={require("../../images/electronics-category3.jpg")} alt="image" />

                                <div className="content">
                                    <span>30% OFF</span>
                                    <h3>Smart Devices</h3>
                                    
                                    <Link href="#">
                                        <a className="btn btn-primary">Shop Now</a>
                                    </Link>
                                </div>
                                
                                <Link href="#">
                                    <a className="link-btn"></a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="offer-categories-box left-categories hover-active">
                                <img src={require("../../images/electronics-category4.jpg")} alt="image" />

                                <div className="content">
                                    <span>20% OFF</span>
                                    <h3>Headphone</h3>
                                    
                                    <Link href="#">
                                        <a className="btn btn-primary">Shop Now</a>
                                    </Link>
                                </div>
                                
                                <Link href="#">
                                    <a className="link-btn"></a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductOffer;