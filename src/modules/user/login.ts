import {BaseValidationType} from "../../types/validators";
import {body} from "express-validator";
import {reqValidationResult} from "../../types/req-validation-result";
import {User} from "../../models/user";
import {comparePasswrds} from "../../helpers/string";


export const loginValidator: BaseValidationType = [
    body('email')
        .notEmpty()
        .isEmail()
        .normalizeEmail()
        .isString(),
    body('password')
        .notEmpty()
        .isString()
        .isLength({min: 7, max: 255}),

    reqValidationResult
];

async function login(req:any, res:any) {
   const {body} = req.body

    const user = await User.findOne({email : req.body.email});

    if (!user || !comparePasswrds(body.password, user.newUser.password)) {
        res.status(400).json(ValidationError('password', 'Invalid email or password'));
        return;
    }
}

export {login}
