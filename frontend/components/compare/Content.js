import React from 'react';
import Link from 'next/link';
import AddToCart from '../Shared/AddToCart';
import RemoveCompare from '../Shared/RemoveCompare';

const Content = ({ compare_products }) => {
    return (
        <section className="compare-area ptb-60">
            <div className="container">
                <div className="section-title">
                    <h2><span className="dot"></span> Compare Products</h2>
                </div>

                <div className="products-compare-table">
                    <div className="row">
                        { compare_products.length ? (
                            compare_products.map((data, idx) => (
                                <div className="col-lg-3 col-md-6 col-sm-6" key={idx}>
                                    <RemoveCompare {...data} />

                                    <div className="single-product-box">
                                        <div className="product-image">
                                            <Link href="#">
                                                <a>
                                                    <img src={data.image} alt="image" />
                                                    <img src={data.imageHover} alt="image" />
                                                </a>
                                            </Link>
                                        </div>

                                        <div className="product-content">
                                            <h3>
                                                <Link href="#">
                                                    <a>{data.title}</a>
                                                </Link>
                                            </h3>

                                            <div className="product-price">
                                                <span className="new-price">${data.price}</span>
                                            </div>

                                            <div className="rating">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="far fa-star"></i>
                                            </div>

                                            <AddToCart {...data} />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>Empty</div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Content
