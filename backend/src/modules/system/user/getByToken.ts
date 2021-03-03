import {NotFoundError} from "../../../util/request";
import { BaseValidationType } from '../../../types/validators';
import { reqValidationResult } from '../../../types/req-validation-result';

export const getByTokenValidator: BaseValidationType = [reqValidationResult];

export async function getByToken(req: any, res: any): Promise<void> {
    const data = req.admin;
    if (!data) {
        res.status(404).json(NotFoundError());
        return;
    }
    res.json(data);
}

