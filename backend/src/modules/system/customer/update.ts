import {body} from 'express-validator';
import {ValidationError} from "../../../util/request";
import {Customer} from "../../../models/Customer";
import {BaseValidationType} from "../../../types/validators";
import {reqValidationResult} from "../../../types/req-validation-result";

export const updateValidator: BaseValidationType = [
    body('firstName')
        .optional()
        .isString()
        .trim()
        .escape()
        .isLength({min: 1, max: 25}),
    body('lastName')
        .optional()
        .isString()
        .trim()
        .escape()
        .isLength({min: 1, max: 25}),
    body('gender')
        .optional()
        .isNumeric(),
    body('nationality')
        .optional()
        .isString(),
    body('residenceCountry')
        .optional()
        .isString(),
    // body('dob')
    //     .notEmpty()
    //     .isString(),
    body('email')
        .optional()
        .isEmail()
        .normalizeEmail()
        .isString(),
    reqValidationResult
];

export async function update(req: any, res: any): Promise<void> {
    const {body} = req;

    const row = await Customer.findOne({_id: req.params.id});
    if (!row) {
        res.status(404).json({'error': 'row not exist'});
        return;
    }

    // check if another user using this email

    if (row.email != body.email) {
        const userExist = await Customer.findOne({email: body.email});
        if (userExist && userExist.id !== row.id) {
            res.status(400).json(ValidationError('email', 'This is email already registered'));
            return;
        }
    }

    Object.keys(body).map((key:string) => {
        row[key] = body.hasOwnProperty(key) ? body[key] : row[key];
    });


    try {
        const rowx = await row.save();
        res.json(rowx);


    } catch (e) {
        console.log(e);
        res.status(500).json({'error': e.message});
    }

}

