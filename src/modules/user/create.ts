import {User} from '../../models/user';
import passwordHash from 'password-hash';
import {body} from 'express-validator';
import {BaseValidationType} from "../../types/validators";
import {reqValidationResult} from "../../types/req-validation-result";


export const createValidator: BaseValidationType = [
    body('name')
        .optional()
        .isString()
        .trim()
        .escape(),
    body('firstName')
        .optional()
        .isString()
        .trim()
        .escape(),
    body('lastName')
        .optional()
        .isString(),
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

export async function create(req:any, res:any) {

    const userExist = await User.countDocuments({email: req.body.email});
    if (userExist > 0) {
        return res.json(400, 'Email already registered');
    }

    // set request data to the object
    const user = new User({
        name: req.body.name,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: passwordHash.generate(req.body.password),
        isActive: true
    });

    // Errors check while saving user
    try {
        const newUser = await user.save();
        res.json(201,{ newUser });
    } catch (err) {
        res.json(400,{ message: err.message });
    }


}


