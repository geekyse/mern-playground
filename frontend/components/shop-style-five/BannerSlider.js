import React, { Component } from 'react';
import Link from 'next/link';
import VisibilitySensor from "react-visibility-sensor";
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(import('react-owl-carousel3'));

const options = {
    items: 1,
    loop: true,
    nav: true,
    dots: false,
    smartSpeed: 2000,
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
        "<i class='fas fa-angle-left'></i>",
        "<i class='fas fa-angle-right'></i>"
    ]
}

class BannerSlider extends Component {

    state = { 
        display: false,
        panel: true
    };

    componentDidMount(){ 
        this.setState({ display: true }) 
    }

    render() {
        return (
            <>
                {this.state.display ? <OwlCarousel 
                    className="home-slides-two owl-carousel owl-theme"
                    {...options}
                >
                    <div className="banner-section item-bg5">
                        <div className="d-table">
                            <div className="d-table-cell">
                                <div className="container">

                                    <VisibilitySensor>
                                        {({ isVisible }) => (
                                            <div className="banner-content">
                                                <span
                                                    className={
                                                        isVisible ? "sub-title animated fadeInUp opacityOne" : 'opacityZero'
                                                    }
                                                >
                                                    Limited Time Offer!
                                                </span>
                                                
                                                <h1
                                                className={
                                                    isVisible ? "animated fadeInUp opacityOne" : 'opacityZero'
                                                    }
                                                >
                                                    Clothing Made for You!
                                                </h1>
                                                    
                                                <p
                                                    className={
                                                        isVisible ? "animated fadeInUp opacityOne" : 'opacityZero'
                                                    }
                                                >
                                                    Take 20% Off ‘Sale Must-Haves'
                                                </p>

                                                <Link href="#">
                                                    <a 
                                                        className={
                                                            `btn btn-primary ${isVisible ? "animated fadeInUp opacityOne" : 'opacityZero'}`
                                                        }
                                                    >
                                                        Shop Women's
                                                    </a>
                                                </Link>
                                            </div>
                                        )}
                                    </VisibilitySensor>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="banner-section item-bg6">
                        <div className="d-table">
                            <div className="d-table-cell">
                                <div className="container">
                                    <VisibilitySensor>
                                        {({ isVisible }) => (
                                            <div className="banner-content">
                                                <span
                                                    className={
                                                        isVisible ? "sub-title animated fadeInUp opacityOne" : 'opacityZero'
                                                    }
                                                >
                                                    Limited Time Offer!
                                                </span>
                                                
                                                <h1
                                                className={
                                                    isVisible ? "animated fadeInUp opacityOne" : 'opacityZero'
                                                    }
                                                >
                                                    Clothing Made for You!
                                                </h1>
                                                    
                                                <p
                                                    className={
                                                        isVisible ? "animated fadeInUp opacityOne" : 'opacityZero'
                                                    }
                                                >
                                                    Take 20% Off ‘Sale Must-Haves'
                                                </p>

                                                <Link href="#">
                                                    <a 
                                                        className={
                                                            `btn btn-primary ${isVisible ? "animated fadeInUp opacityOne" : 'opacityZero'}`
                                                        }
                                                    >
                                                        Shop Men's
                                                    </a>
                                                </Link>
                                            </div>
                                        )}
                                    </VisibilitySensor>
                                </div>
                            </div>
                        </div>
                    </div>
                </OwlCarousel> : ''}
            </>
        );
    }
}

export default BannerSlider;