import Head from 'next/head'
import {Provider} from 'react-redux'
import Layout from '../layouts'
import Router from 'next/router'
import NProgress from 'nprogress'
import '../css/tailwind.css'
import '../css/main.css'
import '../css/layouts/layout-1.css'
import '../css/animate.css'
import '../css/components/buttons.css'
import '../css/components/datepicker.css'
import '../css/components/dropdowns.css'
import '../css/components/forms.css'
import '../css/components/left-sidebar-1/styles-lg.css'
import '../css/components/left-sidebar-1/styles-sm.css'
import '../css/components/modals.css'
import '../css/components/navbar.css'
import '../css/components/nprogress.css'
import '../css/components/recharts.css'
import '../css/components/right-sidebar.css'
import '../css/components/sliders.css'
import '../css/components/steps.css'
import '../css/components/tables.css'
import '../css/components/tabs.css'
import '../css/components/user-widgets/widget-2.css'
import '../css/components/user-widgets/widget-4.css'
import {store} from "next/dist/build/output/store";
import React from "react";

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({Component, pageProps}) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <title/>
            </Head>
            <Provider store={store}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        </>
    )
}

export default MyApp
