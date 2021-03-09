import { param } from 'express-validator';
import { User } from '../../../models/User';
import { BaseValidationType } from '../../../types/validators';
import { reqValidationResult } from '../../../types/req-validation-result';

export const deleteValidator: BaseValidationType = [
  param('id').notEmpty().isString(), reqValidationResult];

export async function deleteRow(req: any, res: any): Promise<void> {
  await User.deleteOne({ _id: req.params.id });
  res.json({});
}

