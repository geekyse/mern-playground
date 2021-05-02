import { reqValidationResult } from '../../../types/req-validation-result';
import { BaseValidationType } from '../../../types/validators';
import { param } from 'express-validator';
import { getUserById } from '../../../models/UserHelpers';

export const getValidator: BaseValidationType = [param('id').notEmpty().isString(), reqValidationResult];

export async function get(req: any, res: any) {
  try {
    const user = await getUserById(req.params.id);
    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}
