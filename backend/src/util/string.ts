import slugify from 'slugify';
import bcrypt from "bcrypt";

const saltRounds = 10;

export const generateRandomString = (length: number) => {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export const format = (user: any) => {
    let userObject = user.toObject();
    let unsafeFields = user.unsafeFields();
    unsafeFields.forEach((key: string | number) => delete userObject[key]);
    return userObject;
};

export const generateRandomSlugString = () => {
    return generateRandomString(5);
};

export const Slug = (str: string) => {
    str = str.replace(/[^a-zA-Z ]/g, ' ');
    str = str.substring(0, 50);
    return slugify(str, {
        lower: true,
        strict: false,
    });
};

export const Summarize = (str: string, length: number) => {
    if (str.length < length) {
        return str;
    }
    return str.substring(0, length) + '...';
};

export const hashPassword = (password: string) => {
    return bcrypt.hashSync(password, saltRounds);
};


export const comparePasswords = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
};
