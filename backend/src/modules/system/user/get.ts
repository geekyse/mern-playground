import {User} from "../../../models/User";
import {reqValidationResult} from "../../../types/req-validation-result";
import {BaseValidationType} from "../../../types/validators";
import {param} from 'express-validator';


export const getValidator: BaseValidationType = [
    param('id')
        .notEmpty()
        .isString(),
    reqValidationResult];

export async function get(req:any, res:any) {
    try {
        const newUser = await User.findById(req.params.id);
        res.status(201).json({ newUser });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}




