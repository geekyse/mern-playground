import React, { Component } from 'react';
import Link from 'next/link';
import VisibilitySensor from "react-visibility-sensor";
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(import('react-owl-carousel3'));

const options = {
    items: 1,
    loop: true,
    nav: false,
    dots: true,
    animateOut: "slideOutDown",
    animateIn: "slideInDown",
    smartSpeed: 750,
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
        "<i class='fas fa-arrow-left'></i>",
        "<i class='fas fa-arrow-right'></i>"
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
                    className="home-slides-three owl-carousel owl-theme"
                    {...options}
                >
                    <div className="main-banner item-bg10">
                        <div className="d-table">
                            <div className="d-table-cell">
                                <div className="container">
                                    <VisibilitySensor>
                                        {({ isVisible }) => (
                                            <div className="main-banner-content white-color">
                                                <span
                                                    className={
                                                        isVisible ? "animated fadeInUp opacityOne" : 'opacityZero'
                                                    }
                                                >
                                                    Limited Time Offer!
                                                </span>
                                                <h1
                                                    className={
                                                        isVisible ? "animated fadeInUp opacityOne" : 'opacityZero'
                                                    }
                                                >
                                                    Winter-spring 2020!
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

                                                <Link href="#">
                                                    <a 
                                                        className={
                                                            `btn btn-light ${isVisible ? "animated fadeInUp opacityOne" : 'opacityZero'}`
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

                    <div className="main-banner item-bg11">
                        <div className="d-table">
                            <div className="d-table-cell">
                                <div className="container">
                                    <VisibilitySensor>
                                        {({ isVisible }) => (
                                            <div className="main-banner-content white-color">
                                                <span
                                                    className={
                                                        isVisible ? "animated fadeInUp slow opacityOne" : 'opacityZero'
                                                    }
                                                >
                                                    New Inspiration 2020!
                                                </span>
                                                <h1
                                                    className={
                                                        isVisible ? "animated fadeInUp slow opacityOne" : 'opacityZero'
                                                    }
                                                >
                                                    Summer-spring 2020!
                                                </h1>
                                                <p
                                                    className={
                                                        isVisible ? "animated fadeInUp slow opacityOne" : 'opacityZero'
                                                    }
                                                >
                                                    Trending from men and women style collection
                                                </p>
                                                
                                                <Link href="#">
                                                    <a 
                                                        className={
                                                            `btn btn-primary ${isVisible ? "animated fadeInUp slow opacityOne" : 'opacityZero'}`
                                                        }
                                                    >
                                                        Shop Women's
                                                    </a>
                                                </Link>

                                                <Link href="#">
                                                    <a 
                                                        className={
                                                            `btn btn-light ${isVisible ? "animated fadeInUp slow opacityOne" : 'opacityZero'}`
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

                    <div className="main-banner item-bg12">
                        <div className="d-table">
                            <div className="d-table-cell">
                                <div className="container">
                                    <VisibilitySensor>
                                        {({ isVisible }) => (
                                            <div className="main-banner-content white-color">
                                                <span
                                                    className={
                                                        isVisible ? "animated fadeInUp opacityOne" : 'opacityZero'
                                                    }
                                                >
                                                    New Inspiration 2020
                                                </span>
                                                <h1
                                                    className={
                                                        isVisible ? "animated fadeInUp opacityOne" : 'opacityZero'
                                                    }
                                                >
                                                    Travel-spring 2020!
                                                </h1>
                                                <p
                                                    className={
                                                        isVisible ? "animated fadeInUp opacityOne" : 'opacityZero'
                                                    }
                                                >
                                                    Up To 30% OFF Select Styles
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

                                                <Link href="#">
                                                    <a 
                                                        className={
                                                            `btn btn-light ${isVisible ? "animated fadeInUp opacityOne" : 'opacityZero'}`
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
