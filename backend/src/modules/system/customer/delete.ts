import {param} from 'express-validator';
import {Customer} from "../../../models/Customer";
import {BaseValidationType} from "../../../types/validators";
import {reqValidationResult} from "../../../types/req-validation-result";


export const deleteValidator: BaseValidationType = [
    param('id')
        .notEmpty()
        .isString(),
    reqValidationResult];

export async function deleteRow(req: any, res: any): Promise<void> {

    const row = await Customer.deleteOne({_id: req.params.id});
    // if (!row) {
    //     res.status(404).json({'error': 'row  not exist'});
    //     return;
    // }

    res.json({});


}

