import {body} from 'express-validator';
import {BaseValidationType, reqValidationResult} from '../../types';
import {ServerError, ValidationError} from "../../util/request";
import {hashPassword} from "../../util/string";
import {Customer} from "../../models/Customer";

export const createValidator: BaseValidationType = [
    body('firstName')
        .notEmpty()
        .isString()
        .isLength({min: 1, max: 25})
        .trim()
        .escape(),
    body('lastName')
        .notEmpty()
        .isString()
        .isLength({min: 1, max: 25})
        .trim()
        .escape(),
    body('email')
        .notEmpty()
        .isEmail()
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .isString(),
    reqValidationResult];

export async function create(req: any, res: any): Promise<void> {
    const {body} = req;

    const hashedPassword = hashPassword(body.password);
    const userRow = new Customer();
    userRow.firstName = body.firstName;
    userRow.lastName = body.lastName;
    userRow.email = body.email;
    userRow.password = hashedPassword;
    userRow.isActive = true;

    // check if email exist

    const userExist = await Customer.count({email: userRow.email});
    if (userExist > 0) {
        res.status(400).json(ValidationError('email', 'This is email already registered'));
        return;
    }

    try {
        await userRow.save();

        res.json(userRow);

    } catch (e) {
        res.status(500).json(ServerError(e.message));
    }

}

