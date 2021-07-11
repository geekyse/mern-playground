import React, { Component } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(import('react-owl-carousel3'));

const options = {
    loop: true,
    nav: false,
    dots: false,
    autoplayHoverPause: true,
    autoplay: true,
    navText: [
        "<i class='fas fa-chevron-left'></i>",
        "<i class='fas fa-chevron-right'></i>"
    ],
    responsive: {
        0: {
            items: 3,
        },
        576: {
            items: 4,
        },
        768: {
            items: 5,
        },
        1200: {
            items: 6,
        }
    }
}

class InstagramPhoto extends Component {

    state = { 
        display: false,
        panel: true
    };

    componentDidMount(){ 
        this.setState({ display: true }) 
    }

    render() {
        return (
            <div className="instagram-area">
                <div className="instagram-title">
                    <Link href="#">
                        <a target="_blank">
                            <i className="fab fa-instagram"></i> Follow us on @novine
                        </a>
                    </Link>
                </div>

                {this.state.display ? <OwlCarousel 
                    className="instagram-slides owl-carousel owl-theme"
                    {...options}
                >
                    <div className="instagram-box">
                        <img src={require("../../images/instagram/insta1.jpg")} alt="image" />

                        <div className="icon">
                            <i className="fab fa-instagram"></i>
                        </div>

                        <a target="_blank" href="https://www.instagram.com/"></a>
                    </div>

                    <div className="instagram-box">
                        <img src={require("../../images/instagram/insta2.jpg")} alt="image" />

                        <div className="icon">
                            <i className="fab fa-instagram"></i>
                        </div>

                        <a target="_blank" href="https://www.instagram.com/"></a>
                    </div>

                    <div className="instagram-box">
                        <img src={require("../../images/instagram/insta3.jpg")} alt="image" />

                        <div className="icon">
                            <i className="fab fa-instagram"></i>
                        </div>

                        <a target="_blank" href="https://www.instagram.com/"></a>
                    </div>

                    <div className="instagram-box">
                        <img src={require("../../images/instagram/insta4.jpg")} alt="image" />

                        <div className="icon">
                            <i className="fab fa-instagram"></i>
                        </div>

                        <a target="_blank" href="https://www.instagram.com/"></a>
                    </div>

                    <div className="instagram-box">
                        <img src={require("../../images/instagram/insta5.jpg")} alt="image" />

                        <div className="icon">
                            <i className="fab fa-instagram"></i>
                        </div>

                        <a target="_blank" href="https://www.instagram.com/"></a>
                    </div>

                    <div className="instagram-box">
                        <img src={require("../../images/instagram/insta6.jpg")} alt="image" />

                        <div className="icon">
                            <i className="fab fa-instagram"></i>
                        </div>

                        <a target="_blank" href="https://www.instagram.com/"></a>
                    </div>

                    <div className="instagram-box">
                        <img src={require("../../images/instagram/insta7.jpg")} alt="image" />

                        <div className="icon">
                            <i className="fab fa-instagram"></i>
                        </div>

                        <a target="_blank" href="https://www.instagram.com/"></a>
                    </div>

                    <div className="instagram-box">
                        <img src={require("../../images/instagram/insta8.jpg")} alt="image" />

                        <div className="icon">
                            <i className="fab fa-instagram"></i>
                        </div>

                        <a target="_blank" href="https://www.instagram.com/"></a>
                    </div>

                    <div className="instagram-box">
                        <img src={require("../../images/instagram/insta9.jpg")} alt="image" />

                        <div className="icon">
                            <i className="fab fa-instagram"></i>
                        </div>
                        <a target="_blank" href="https://www.instagram.com/"></a>
                    </div>
                </OwlCarousel> : ''}
            </div>
        );
    }
}

export default InstagramPhoto;
