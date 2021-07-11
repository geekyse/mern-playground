import React, { Component } from 'react';
import Link from 'next/link';

class Banner extends Component {
    render() {
        return (
            <>
                <div className="main-banner grocery-banner furniture-banner">
                    <div className="d-table">
                        <div className="d-table-cell">
                            <div className="container">
                                <div className="main-banner-content">
                                    <span>Summer Collections</span>
                                    <h1>New Arrivals!</h1>
                                    <p>Take 20% Off ‘Sale Must-Haves'</p>

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
