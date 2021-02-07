import {isBrowser} from './browser';

export function dataLayerTrackPageView(props) {
    // only fire on client side
    if (!isBrowser) {
        return;
    }

    // if no ga found
    const {url} = props || {};
    console.log(`push GA ${url}`)

    const lastPageUrl = sessionStorage.getItem('last_page_url');
    if (lastPageUrl === url) {
        return;
    }
    sessionStorage.setItem('last_page_url', url);
    // push to datalayer
    // @ts-ignore
    window.dataLayer = window.dataLayer || [];
    // @ts-ignore
    window.dataLayer.push({
        event: 'pageview',
        page: {
            path: url
        }
    });
}