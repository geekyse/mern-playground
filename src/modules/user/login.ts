import {BaseValidationType} from "../../types/validators";
import {body} from "express-validator";
import {reqValidationResult} from "../../types/req-validation-result";
import {User} from "../../models/user";
import passwordHash from 'password-hash';
import {ServerError, ValidationError} from "../../util/request";
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

export async function login(req: any, res: any): Promise<void> {
    const {body} = req;

    let user = await User.findOne({email: body.email});
    if (!user || !comparePasswrds(body.password, user.password)) {
        res.status(400).json(ValidationError('password', 'Invalid email or password'));
        return;
    }

    try {
        const session = await user.generateSession();
        res.json({
            // @ts-ignore
            user: await User.format(user),
            token: session.token,
        });

    } catch (e) {
        console.log(e);
        res.status(500).json(ServerError(e.message));
    }

}
