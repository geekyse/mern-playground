import React, { Component } from 'react';
import Link from 'next/link';
import VisibilitySensor from "react-visibility-sensor";
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(import('react-owl-carousel3'));

const options = {
    loop: true,
    nav: true,
    dots: true,
    autoplayHoverPause: true,
    items: 1,
    smartSpeed: 750,
    autoplay: true,
    navText: [
        "<i class='fas fa-arrow-left'></i>",
        "<i class='fas fa-arrow-right'></i>"
    ]
}

class Banner extends Component {
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
                    className="home-slides owl-carousel owl-theme"
                    {...options}
                >
                    <div className="main-banner covid-19-banner covid-19-item-bg1">
                        <div className="d-table">
                            <div className="d-table-cell">
                                <div className="container">
                                    <VisibilitySensor>
                                        {({ isVisible }) => (
                                            <div className="main-banner-content">
                                                <span
                                                    className={
                                                        isVisible ? "animated fadeInUp opacityOne" : 'opacityZero'
                                                    }
                                                >
                                                    Best Seller
                                                </span>
                                                <h1
                                                    className={
                                                        isVisible ? "animated fadeInUp opacityOne" : 'opacityZero'
                                                    }
                                                >
                                                    Medical Mask
                                                </h1>
                                                <p
                                                    className={
                                                        isVisible ? "animated fadeInUp opacityOne" : 'opacityZero'
                                                    }
                                                >
                                                    Be Clean & Keep Clean, Maintain Social Distance, Avoid All Kinds of Crowds including Social Gathering, Protect Yourself and Others, Save Humankind!
                                                </p>
                                                
                                                <Link href="#">
                                                    <a 
                                                        className={
                                                            `btn btn-primary ${isVisible ? "animated fadeInUp opacityOne" : 'opacityZero'}`
                                                        }
                                                    >
                                                        Shop Now!
                                                    </a>
                                                </Link>
                                            </div>
                                        )}
                                    </VisibilitySensor>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="main-banner covid-19-banner covid-19-item-bg2">
                        <div className="d-table">
                            <div className="d-table-cell">
                                <div className="container">
                                    <VisibilitySensor>
                                        {({ isVisible }) => (
                                            <div className="main-banner-content">
                                                <span
                                                    className={
                                                        isVisible ? "animated fadeInUp slow opacityOne" : 'opacityZero'
                                                    }
                                                >
                                                    Trading Collection
                                                </span>
                                                <h1
                                                    className={
                                                        isVisible ? "animated fadeInUp slow opacityOne" : 'opacityZero'
                                                    }
                                                >
                                                    Hand Sanitizer
                                                </h1>
                                                <p
                                                    className={
                                                        isVisible ? "animated fadeInUp slow opacityOne" : 'opacityZero'
                                                    }
                                                >
                                                    Be Clean & Keep Clean, Maintain Social Distance, Avoid All Kinds of Crowds including Social Gathering, Protect Yourself and Others, Save Humankind!
                                                </p>
                                                
                                                <Link href="#">
                                                    <a 
                                                        className={
                                                            `btn btn-primary ${isVisible ? "animated fadeInUp slow opacityOne" : 'opacityZero'}`
                                                        }
                                                    >
                                                        Shop Now!
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

export default Banner;
