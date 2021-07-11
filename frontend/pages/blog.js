import React, { Component } from 'react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import Facility from '../components/Common/Facility';
import Breadcrumb from '../components/Common/Breadcrumb';
import BlogGrid from '../components/blog/BlogGrid';

class Blog extends Component {
    render() {
        return (
            <>
                <Navbar />

                <Breadcrumb title="Blog" />

                <BlogGrid />

                <Facility />
                
                <Footer />
            </>
        );
    }
}

export default Blog;