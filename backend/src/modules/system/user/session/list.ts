
import {query} from 'express-validator';
import {getPageData} from "../../../../util/request";
import {UserSession} from "../../../../models/UserSession";
import {reqValidationResult} from "../../../../types/req-validation-result";
import {BaseValidationType} from "../../../../types/validators";

export const listValidator: BaseValidationType = [
    query('filter[email]')
        .optional()
        .isString(),
    query('filter[firstName]')
        .optional()
        .isString(),
    query('filter[lastName]')
        .optional()
        .isString(),
    reqValidationResult];

export async function list(req: any, res: any): Promise<void> {

    const data = await getPageData(req, UserSession);
    res.send(data);
}

