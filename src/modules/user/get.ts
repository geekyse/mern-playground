// const User = require('./../../models/user');
// import { isExist } from "../../helpers/create-user-validator";
import {User} from "../../models/user";
// import {validationResult} from "express-validator";


async function get(req:any, res:any) {

    try {
        const newUser = await User.findById(req.params.id);
        res.status(201).json({ newUser });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

}
export {get}




