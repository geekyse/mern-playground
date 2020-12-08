
import bcrypt from "bcrypt";


export const comparePasswrods = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};