import slugify from 'slugify';

import bcrypt from "bcrypt";

const saltRounds = 10;

export const generateRandomString = (length) => {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
export const generateRandomSlugString = () => {
    return generateRandomString(5);
};

export const Slug = (string) => {
    string = string.replace(/[^a-zA-Z ]/g, ' ');
    string = string.substring(0, 50);
    return slugify(string, {
        lower: true,
        strict: false,
    });
};
export const Summarize = (str, length) => {
    if (str.length < length) {
        return str;
    }
    return str.substring(0, length) + '...';
};

export const hashPassword = (password) => {
    const hash = bcrypt.hashSync(password, saltRounds);
    return hash;
};


export const comparePasswrds = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};
