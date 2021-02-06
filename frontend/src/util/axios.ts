import axios from 'axios';
import nextCookie from 'next-cookies';

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 15000,
});


export const getConfig = (ctx: any) => {
    const {token, admin_token} = nextCookie(ctx);
    let headers = {};

    if (token) {
        headers['x-user-token'] = token;
    }

    if (admin_token) {
        headers['x-admin-token'] = admin_token;
    }

    return {
        headers: headers,
    };

};
