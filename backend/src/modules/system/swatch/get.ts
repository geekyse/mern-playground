import {param} from 'express-validator';
import {NotFoundError} from "../../../util/request";
import {Category} from "../../../models/Category";
import { BaseValidationType } from '../../../types/validators';
import { reqValidationResult } from '../../../types/req-validation-result';

export const getValidator: BaseValidationType = [
    param('id')
        .notEmpty()
        .isString(),
    reqValidationResult];

export async function get(req: any, res: any): Promise<void> {

    const row = await Category.findOne({_id: req.params.id});
    if (!row) {
        res.status(404).json(NotFoundError());
        return;
    }
    res.json(row);


}

