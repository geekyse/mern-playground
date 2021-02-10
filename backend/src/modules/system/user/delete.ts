import {param} from 'express-validator';
import {BaseValidationType, reqValidationResult} from '../../../types';
import {User} from "../../../models/User";


export const deleteValidator: BaseValidationType = [
    param('id')
        .notEmpty()
        .isString(),
    reqValidationResult];

export async function deleteRow(req: any, res: any): Promise<void> {
    await User.deleteOne({_id: req.params.id});
    res.json({});
}

