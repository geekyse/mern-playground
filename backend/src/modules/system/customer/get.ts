import {param} from 'express-validator';
import {NotFoundError} from "../../../util/request";
import {Customer} from "../../../models/Customer";
import {reqValidationResult} from "../../../types/req-validation-result";
import {BaseValidationType} from "../../../types/validators";

export const getValidator: BaseValidationType = [
    param('id')
        .notEmpty()
        .isString(),
    reqValidationResult];

export async function get(req: any, res: any): Promise<void> {

    const row = await Customer.findOne({_id: req.params.id});
    if (!row) {
        res.status(404).json(NotFoundError());
        return;
    }
    res.json(row);


}

