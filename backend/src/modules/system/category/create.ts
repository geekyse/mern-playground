import {body} from 'express-validator';
import {ServerError} from "../../../util/request";
import { BaseValidationType } from '../../../types/validators';
import { reqValidationResult } from '../../../types/req-validation-result';
import {Category} from '../../../models/Category'
export const createValidator: BaseValidationType = [
    body('title').notEmpty().isString().isLength({max: 255}).trim(),
    body('description').optional().isString().isLength({max: 5000}).trim(),
    reqValidationResult];

export async function create(req: any, res: any): Promise<void> {
    const {body} = req;

    const category = new Category();
    category.title = body.title;
    category.description = body.description;

    try {
        await category.save();
        res.json(category);
    } catch (e) {
        res.status(500).json(ServerError(e.message));
    }
}

