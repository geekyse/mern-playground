import {query} from 'express-validator';
import {BaseValidationType, reqValidationResult} from '../../../../types';
import {getPageData} from '../../../../util/request';
import {CustomerSession} from "../../../../models/CustomerSession";

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

    const data = await getPageData(req, CustomerSession);
    res.send(data);
}

