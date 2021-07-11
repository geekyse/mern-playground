import React, { Component } from 'react';
import Link from 'next/link';

class ProductOffer extends Component {
    render() {
        return (
            <div className="offer-area-two offer-bg-image">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-5 col-md-6 offset-lg-7 offset-md-6">
                            <div className="offer-content-box">
                                <span className="sub-title">Limited Time Offer!</span>
                                <h2>-40% OFF</h2>
                                <p>Get The Best Deals Now</p>
                                <Link href="#">
                                    <a className="btn btn-primary">Discover Now</a>
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
