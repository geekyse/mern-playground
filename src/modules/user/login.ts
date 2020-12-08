import {BaseValidationType} from "../../types/validators";
import {body} from "express-validator";
import {reqValidationResult} from "../../types/req-validation-result";
import {User} from "../../models/user";
import passwordHash from 'password-hash';


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
     const user = await User.findOne({email : req.body.email});
        console.log(user,"----------------------")
     if (!user || !passwordHash.verify(req.body.password, user["password"])) {
         res.json(201,'Invalid email or password' )
        return   ;
    }
    // @TODO create session
     return res.json('HELLO' )  ;
}
export {login}
