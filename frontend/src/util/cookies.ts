import Cookies from 'js-cookie';
import {parseCookies} from "nookies";

export const login = (token) => {
    Cookies.set('token', token, {expires: 1});
};

export const setCartId = (cartId) => {
    Cookies.set('cartId', cartId, {expires: 1});
};
export const getCartId = (req) => {
    // is browser
    if (!req.cookies) {
        const {cartId} = parseCookies(req);
        return cartId;
    }
    const {cartId} = req.cookies;
    return cartId;

};
export const emptyCart = () => {
    Cookies.remove('cartId');
};
export const isLoggedIn = (req) => {
    if (!req.cookies) {
        const {token} = parseCookies(req);
        return (token !== undefined && token !== null && token !== '');
    }
    const {token} = req.cookies;
    return token;

};





