import nextCookie from 'next-cookies';
import React from 'react';
import Cookies from 'js-cookie';
import Router from 'next/router';
import {parseCookies} from 'nookies';
import {isBrowser} from './browser';
import {isLoggedIn} from './cookies';

export const logout = () => {
    Cookies.remove('token');
    // To trigger the event listener we save some random data into the `logout` key
    window.localStorage.setItem('logout', Date.now().toString()); // new
};

export const SaveOption = (option: string, value: any) => {
    if (isBrowser) {
        window.localStorage.setItem('option_' + option, value);
    }
};
export const GetOption = (option: string, defaultValue = true) => {
    if (isBrowser) {
        const value = window.localStorage.getItem('option_' + option);
        if (!value) {
            return defaultValue;
        }
        return (value === 'true');

    }
    return defaultValue;
};

export const ResetOption = (option: string) => {
    if (isBrowser) {
        window.localStorage.removeItem('option_' + option);
    }
};

export const logoutAdmin = () => {
    Cookies.remove('admin_token');
    // To trigger the event listener we save some random data into the `logout` key
    if (typeof window !== 'undefined') {
        window.localStorage.setItem('logout', Date.now().toString()); // new
    }

};


export const login = (token) => {
    Cookies.set('token', token, {expires: 1});
};

export const setCartId = (cartId) => {
    Cookies.set('cartId', cartId, {expires: 1});
};

export const loginAdmin = (token) => {
    Cookies.set('admin_token', token, {expires: 1});
};


export const isLoggedInAdmin = (router) => {
    const cookies = parseCookies(router);
    const token = cookies.admin_token;
    return (token !== undefined && token !== null && token !== '');

};

export const auth = ctx => {
    const {token} = nextCookie(ctx);

    if (ctx.req && !token) {
        ctx.res.writeHead(302, {Location: '/login'});
        ctx.res.end();
        return;
    }

    if (!token) {
        Router.push('/login');
    }

    return token;
};

export const withAuthSync = (WrappedComponent, requireAuth = true) => {

    const Wrapper = props => {

        return <WrappedComponent {...props} />;
    };

    Wrapper.getInitialProps = async ctx => {

        const {token} = nextCookie(ctx);

        const isLogged = isLoggedIn(ctx);

        if (requireAuth && !isLogged) {

            if (ctx.req) {
                ctx.res.writeHead(302, {Location: '/login'});
                ctx.res.end();
                return; // should be added IMO.
            } else {
                await Router.push('/login');
            }
        }

        if (!requireAuth && isLogged) {
            if (ctx.req) {
                ctx.res.writeHead(302, {Location: '/'});
                ctx.res.end();
                return; // should be added IMO.
            } else {
                await Router.push('/');
            }
        }


        const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

        return {...componentProps, token: token, isLogged: isLogged};
    };

    return Wrapper;
};
export const withAdminAuthSync = (WrappedComponent, requireAuth = true) => {

    const Wrapper = props => {

        return <WrappedComponent {...props} />;
    };

    Wrapper.getInitialProps = async ctx => {

        const {admin_token} = nextCookie(ctx);

        const isLogged = isLoggedInAdmin(ctx);

        if (requireAuth && !isLogged) {

            if (ctx.req) {
                ctx.res.writeHead(302, {Location: '/login'});
                ctx.res.end();
                return; // should be added IMO.
            } else {
                await Router.push('/login');
            }
        }

        if (!requireAuth && isLogged) {
            if (ctx.req) {
                ctx.res.writeHead(302, {Location: '/'});
                ctx.res.end();
                return; // should be added IMO.
            } else {
                await Router.push('/');
            }
        }


        const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

        return {...componentProps, token: admin_token, isLogged: isLogged};
    };

    return Wrapper;
};