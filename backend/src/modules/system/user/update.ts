import {body} from 'express-validator';
import {reqValidationResult} from "../../../types/req-validation-result";
import {BaseValidationType} from "../../../types/validators";
import {User} from "../../../models/User";
import { ValidationError } from '../../../util/request';

export const updateValidator: BaseValidationType = [
    body('userName').optional().isString().trim().escape(),
    body('firstName').optional().isString().trim().escape(),
    body('lastName').optional().isString(),
    body('bio').optional().isString(),
    body('address').optional().isString(),
    body('city').optional().isString(),
    body('country').optional().isString(),
    body('education').optional().isString(),
    body('work').optional().isString(),
    body('about').optional().isString(),
    reqValidationResult
];

export async function update(req: any, res: any): Promise<void> {
    console.log("-----ss-----------")

    const {body} = req;
    console.log("-----ss-----------")

    const user = await User.findOne({_id: req.params.id});
    if (!user) {
        console.log(user)
        res.json(404, 'error user doesn\'t exists');
        return ;
    }

    console.log("-----ss-----------")
    // check if another user using this email
    if (user.email != body.email) {
        const userExist = await User.findOne({email: body.email});
        if (userExist && userExist.id !== user.id) {
            res.status(400).json(ValidationError('email', 'This is email already registered'));
            return;
        }
    }

    Object.keys(body).map((key) => {
        user[key] = body.hasOwnProperty(key) ? body[key] : user[key];
    });

    try {
        const saveUser = await user.save();
        res.json(saveUser);
    } catch (e) {
        console.log(e);
        res.status(500).json({'error': e.message});
    }
}

