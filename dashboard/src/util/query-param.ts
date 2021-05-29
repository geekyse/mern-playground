import get from 'lodash.get';

import {isBrowser} from './browser';

export function getQueryByName(name: string, serverQueryParams?: any): string {
    if (!isBrowser) {
        return get(serverQueryParams, name);
        // return getQueryParamFromNextData(name);
    }
    name = name.replace(/[[]]/g, '\\$&');

    const regex: RegExp = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const url: string = window?.location?.href;
    const results = regex.exec(url);

    if (!results || !results[2]) {
        return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function getQueryParamFromNextData(key: string, defaultValue: any): any {
    if (!isBrowser) {
        return;
    }

    const reqData: any = window?.__NEXT_DATA__?.query;

    return reqData[key] || defaultValue;
}

export function getLang(defaultValue: any = 'en'): any {
    if (!isBrowser) {
        return process?.env?.lang || defaultValue;
    }

    return window?.__NEXT_DATA__?.query?.lang || window?.__NEXT_DATA__?.props?.lang || defaultValue;
}
