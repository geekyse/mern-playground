import React, { Component } from 'react';
import Link from 'next/link';
import QuickView from '../Modal/QuickView';
import dynamic from 'next/dynamic';
import AddToCart from '../Shared/AddToCart';
const OwlCarousel = dynamic(import('react-owl-carousel3'));

const options = {
    loop: true,
    nav: true,
    smartSpeed: 750,
    dots: false,
    autoplayHoverPause: true,
    margin: 30,
    autoplay: true,
    navText: [
        "<i class='fas fa-chevron-left'></i>",
        "<i class='fas fa-chevron-right'></i>"
    ],
    responsive: {
        0: {
            items: 1,
        },
        576: {
            items: 2,
        },
        768: {
            items: 2,
        },
        1024: {
            items: 3,
        },
        1200: {
            items: 4,
        }
    }
}

class TrendingProducts extends Component {

    state = {
        modalOpen: false,
        modalData: null,
        display: false,
        panel: true
    };

    openTabSection = (evt, tabNmae) => {
        let i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabs_item_trending");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].classList.remove("fadeInUp");
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByTagName("li");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace("current", "");
        }

        document.getElementById(tabNmae).style.display = "block";
        document.getElementById(tabNmae).className += " fadeInUp animated";
        evt.currentTarget.className += "current";
    }

    componentDidMount(){ 
        this.setState({ display: true }) 
    }

    openModal = () => {
        this.setState({ modalOpen: true });
    }

    closeModal = () => {
        this.setState({ modalOpen: false });
    }

    handleModalData = (data) => {
        this.setState({ 
            modalData: data
        });
    }

    render() {
        let { products } = this.props;
        const { modalOpen } = this.state;
        return (
            <section className="trending-products-area pb-60">
                <div className="container">
                    <div className="tab products-category-tab-style-2">
                        <div className="title">
                            <h2><span className="dot"></span> Trending Products</h2>
                        </div>

                        {/* Tabs Nav */}
                        <ul className="tabs">
                            <li
                                onClick={(e) => {e.preventDefault(); this.openTabSection(e, 'tab7')}}
                                className="current"
                            >
                                <span>All</span>
                            </li>
                            
                            <li
                                onClick={(e) => {e.preventDefault(); this.openTabSection(e, 'tab8')}}
                            >
                                <span>Men</span>
                            </li>
                            
                            <li
                                onClick={(e) => {e.preventDefault(); this.openTabSection(e, 'tab9')}}
                            >
                                <span>Women</span>
                            </li>
                        </ul>

                        {/* Tab Content */}
                        <div className="tab_content">
                            <div id="tab7" className="tabs_item_trending">
                                {this.state.display ? <OwlCarousel 
                                    className="product-slides owl-carousel owl-theme"
                                    {...options}
                                >
                                    {products.map((data, idx) => (
                                        <div key={idx}>
                                            <div className="single-product-item">
                                                <div className="product-image">
                                                    <Link href="/product/[id]" as={`/product/${data.id}`}>
                                                        <a>
                                                            <img src={data.image} alt="image" />
                                                        </a>
                                                    </Link>
                                                </div>

                                                <div className="product-content">
                                                    <h3>
                                                        <Link href="/product/[id]" as={`/product/${data.id}`}>
                                                            <a>{data.title}</a>
                                                        </Link>
                                                    </h3>

                                                    <div className="product-price">
                                                        <span className="new-price">${data.price}</span>
                                                    </div>

                                                    <div className="row align-items-end">
                                                        <div className="col-lg-7 col-md-6 col-7">
                                                            <AddToCart {...data} />
                                                        </div>

                                                        <div className="col-lg-5 col-md-6 col-5">
                                                            <ul>
                                                                <li>
                                                                    <Link href="#">
                                                                        <a 
                                                                            data-tip="Quick View" 
                                                                            data-place="left" 
                                                                            onClick={e => {
                                                                                    e.preventDefault(); 
                                                                                    this.openModal();
                                                                                    this.handleModalData(data)
                                                                                }
                                                                            }
                                                                        >
                                                                            <i className="far fa-eye"></i>
                                                                        </a>
                                                                    </Link>
                                                                </li>

                                                                <li>
                                                                    <Link href="#">
                                                                        <a data-tip="Add to Wishlist" data-place="left">
                                                                            <i className="far fa-heart"></i>
                                                                        </a>
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </OwlCarousel> : ''}
                            </div>

                            <div id="tab8" className="tabs_item_trending">
                                {this.state.display ? <OwlCarousel 
                                    className="product-slides owl-carousel owl-theme"
                                    {...options}
                                >
                                    {products.map((data, idx) => (
                                        <div key={idx}>
                                            <div className="single-product-item">
                                                <div className="product-image">
                                                    <Link href="/product/[id]" as={`/product/${data.id}`}>
                                                        <a>
                                                            <img src={data.image} alt="image" />
                                                        </a>
                                                    </Link>
                                                </div>

                                                <div className="product-content">
                                                    <h3>
                                                        <Link href="/product/[id]" as={`/product/${data.id}`}>
                                                            <a>{data.title}</a>
                                                        </Link>
                                                    </h3>

                                                    <div className="product-price">
                                                        <span className="new-price">${data.price}</span>
                                                    </div>

                                                    <div className="row align-items-end">
                                                        <div className="col-lg-7 col-md-6 col-7">
                                                            <AddToCart {...data} />
                                                        </div>

                                                        <div className="col-lg-5 col-md-6 col-5">
                                                            <ul>
                                                                <li>
                                                                    <Link href="#">
                                                                        <a 
                                                                            data-tip="Quick View" 
                                                                            data-place="left" 
                                                                            onClick={e => {
                                                                                    e.preventDefault(); 
                                                                                    this.openModal();
                                                                                    this.handleModalData(data)
                                                                                }
                                                                            }
                                                                        >
                                                                            <i className="far fa-eye"></i>
                                                                        </a>
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href="#">
                                                                        <a data-tip="Add to Wishlist" data-place="left">
                                                                            <i className="far fa-heart"></i>
                                                                        </a>
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </OwlCarousel> : ''}
                            </div>

                            <div id="tab9" className="tabs_item_trending">
                                {this.state.display ? <OwlCarousel 
                                    className="product-slides owl-carousel owl-theme"
                                    {...options}
                                >
                                    {products.map((data, idx) => (
                                        <div key={idx}>
                                            <div className="single-product-item">
                                                <div className="product-image">
                                                    <Link href="/product/[id]" as={`/product/${data.id}`}>
                                                        <a>
                                                            <img src={data.image} alt="image" />
                                                        </a>
                                                    </Link>
                                                </div>

                                                <div className="product-content">
                                                    <h3>
                                                        <Link href="/product/[id]" as={`/product/${data.id}`}>
                                                            <a>{data.title}</a>
                                                        </Link>
                                                    </h3>

                                                    <div className="product-price">
                                                        <span className="new-price">${data.price}</span>
                                                    </div>

                                                    <div className="row align-items-end">
                                                        <div className="col-lg-7 col-md-6 col-7">
                                                            <AddToCart {...data} />
                                                        </div>

                                                        <div className="col-lg-5 col-md-6 col-5">
                                                            <ul>
                                                                <li>
                                                                    <Link href="#">
                                                                        <a 
                                                                            data-tip="Quick View" 
                                                                            data-place="left" 
                                                                            onClick={e => {
                                                                                    e.preventDefault(); 
                                                                                    this.openModal();
                                                                                    this.handleModalData(data)
                                                                                }
                                                                            }
                                                                        >
                                                                            <i className="far fa-eye"></i>
                                                                        </a>
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href="#">
                                                                        <a data-tip="Add to Wishlist" data-place="left">
                                                                            <i className="far fa-heart"></i>
                                                                        </a>
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </OwlCarousel> : ''}
                            </div>
                        </div>
                    </div>
                </div>
                { modalOpen ? <QuickView 
                    closeModal={this.closeModal} 
                    modalData={this.state.modalData}
                /> : '' }
            </section>
        );
    }
}

export default TrendingProducts
