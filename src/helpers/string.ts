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

export const hashPassword = (password) => {
    return bcrypt.hashSync(password, saltRounds);
};

export const comparePasswords = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};