import React from 'react';
import Head from 'next/head';
import GoTop from '../Shared/GoTop';
import { ToastContainer, Slide } from 'react-toastify';
import ReactTooltip from 'react-tooltip'

const Layout = ({ children }) => {
    return(
        <>
            <ReactTooltip  />
            
            <Head>
                <title>Novine - React Next eCommerce Templates</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="description" content="Novine is a clean and modern purse React Next JS eCommerce template. This is built on React.js, Next.js, React-Redux, ES6+, Sass and Bootstrap 4." />
                <meta name="og:title" property="og:title" content="Novine - React Next eCommerce Templates"></meta>
                <meta name="twitter:card" content="Novine - React Next eCommerce Templates"></meta>
                <link rel="canonical" href="https://novine-react.envytheme.com/"></link>
                <meta property="og:image" content="https://res.cloudinary.com/dev-empty/image/upload/v1590076309/ppuymfucr4jubqvhqaqt.jpg" />
            </Head>

            { children }

            <ToastContainer transition={Slide} />

            <GoTop scrollStepInPx="100" delayInMs="10.50" />
        </>
    );
}
export default Layout;