
import bcrypt from "bcrypt";


export const comparePasswrds = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};