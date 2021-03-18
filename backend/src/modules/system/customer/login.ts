import {body} from 'express-validator';
import {comparePasswords} from "../../../util/string";
import {ServerError, ValidationError} from "../../../util/request";
import {Customer} from "../../../models/Customer";
import {BaseValidationType} from "../../../types/validators";
import {reqValidationResult} from "../../../types/req-validation-result";


export const loginValidator: BaseValidationType = [
    body('email')
        .notEmpty()
        .isEmail()
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .isString(),
    reqValidationResult];

export async function loginAction(req: any, res: any): Promise<void> {
    const {body} = req;

    let user = await Customer.findOne({email: body.email});
    if (!user || !comparePasswords(body.password, user.password)) {
        res.status(400).json(ValidationError('password', 'Invalid email or password'));
        return;
    }

    try {
        const session = await user.generateSession();
        res.json({
            // @ts-ignore
            user: await Customer.format(user),
            token: session.token,
        });

    } catch (e) {
        console.log(e);
        res.status(500).json(ServerError(e.message));
    }

}

