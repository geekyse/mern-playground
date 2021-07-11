import React, { Component } from 'react';
import Link from 'next/link';

class Banner extends Component {
    render() {
        return (
            <>
                <div className="main-banner grocery-banner electronics-banner">
                    <div className="d-table">
                        <div className="d-table-cell">
                            <div className="container">
                                <div className="main-banner-content">
                                    <h1>Latest Best Devices</h1>
                                    <p>Trending products for sale!</p>
                                    <h2>50% OFF</h2>
                                    <Link href="#">
                                        <a className="btn btn-primary">Shop Now!</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Banner;
