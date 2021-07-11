import React, { Component } from 'react';
import Link from 'next/link';
import QuickView from '../Modal/QuickView';
import AddToCart from '../Shared/AddToCart';

class ProductsCard extends Component {
    state = {
        modalOpen: false,
        modalData: null
    };
    handleModalData = (data) => {
        this.setState({ 
            modalData: data
        });
    }
    openModal = () => {
        this.setState({ modalOpen: true });
    }

    closeModal = () => {
        this.setState({ modalOpen: false });
    }

    render() {
        let { products } = this.props;
        const { modalOpen } = this.state;
        return (
            <>
                {products.map((data, idx) => (
                    <div className="col-lg-3 col-md-6 products-col-item" key={idx}>
                        <div className="single-product-box">
                            <div className="product-image">
                                <Link href="/product/[id]" as={`/product/${data.id}`}>
                                    <a>
                                        <img src={data.image} alt="image" />
                                        <img src={data.imageHover} alt="image" />
                                    </a>
                                </Link>

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
                                    <li>
                                        <Link href="#">
                                            <a data-tip="Add to Compare" data-place="left">
                                                <i className="fas fa-sync"></i>
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
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
                ))}
                { modalOpen ? <QuickView 
                    closeModal={this.closeModal} 
                    modalData={this.state.modalData}
                /> : '' }
            </>
        );
    }
}

export default ProductsCard