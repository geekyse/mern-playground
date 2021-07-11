import React, { Component } from 'react';
import Link from 'next/link';

class News extends Component {
    render() {
        return (
            <section className="news-area pt-60 pb-30">
                <div className="container">
                    <div className="section-title">
                        <h2><span className="dot"></span> Latest News</h2>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="single-news-post">
                                <div className="news-image">
                                    <Link href="/blog-details">
                                        <a>
                                            <img src={require("../../images/blog-img7.jpg")} alt="image" />
                                        </a>
                                    </Link>
                                </div>

                                <div className="news-content">
                                    <h3>
                                        <Link href="/blog-details">
                                            <a>Over 80 million Americans under virtual lockdown</a>
                                        </Link>
                                    </h3>
                                    <span className="author">By <a href="#">Admin</a></span>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    <Link href="/blog-details">
                                        <a className="btn btn-light">Read More</a>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="single-news-post">
                                <div className="news-image">
                                    <Link href="/blog-details">
                                        <a>
                                            <img src={require("../../images/blog-img8.jpg")} alt="image" />
                                        </a>
                                    </Link>
                                </div>

                                <div className="news-content">
                                    <h3>
                                        <Link href="/blog-details">
                                            <a>People worldwide adjust to new life amid COVID-19</a>
                                        </Link>
                                    </h3>
                                    <span className="author">By <a href="#">Admin</a></span>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    <Link href="/blog-details">
                                        <a className="btn btn-light">Read More</a>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 offset-md-3 offset-lg-0">
                            <div className="single-news-post">
                                <div className="news-image">
                                    <Link href="/blog-details">
                                        <a>
                                            <img src={require("../../images/blog-img9.jpg")} alt="image" />
                                        </a>
                                    </Link>
                                </div>

                                <div className="news-content">
                                    <h3>
                                        <Link href="/blog-details">
                                            <a>Coronavirus stimulus checks what you know</a>
                                        </Link>
                                    </h3>
                                    <span className="author">By <a href="#">Admin</a></span>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    <Link href="/blog-details">
                                        <a className="btn btn-light">Read More</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default News;
