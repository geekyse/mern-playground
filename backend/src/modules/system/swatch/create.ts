import {body} from 'express-validator';
import {ServerError} from "../../../util/request";
import { BaseValidationType } from '../../../types/validators';
import { reqValidationResult } from '../../../types/req-validation-result';
import {Swatch} from '../../../models/Swatch'
export const createValidator: BaseValidationType = [
    body('title').notEmpty().isString().isLength({max: 255}).trim(),
    body('type').notEmpty().isString().isLength({max: 255}).trim(),
    body('group').notEmpty().isString().isLength({max: 255}).trim(),
    body('description').optional().isString().isLength({max: 5000}).trim(),
    reqValidationResult];

export async function create(req: any, res: any): Promise<void> {
    const {body} = req;

    const swatch = new Swatch();
    swatch.title = body.title;
    swatch.type = body.type;
    swatch.group = body.group;
    swatch.description = body.description;

    try {
        await swatch.save();
        res.json(swatch);
    } catch (e) {
        res.status(500).json(ServerError(e.message));
    }
}

