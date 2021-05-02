import { param } from 'express-validator';
import { BaseValidationType } from '../../../types/validators';
import { reqValidationResult } from '../../../types/req-validation-result';
import { Product } from '../../../models/Product';


export const deleteValidator: BaseValidationType = [
  param('id')
    .notEmpty()
    .isString(),
  reqValidationResult];

export async function deleteRow(req: any, res: any): Promise<void> {
  await Product.deleteOne({ _id: req.params.id });
  res.json('Product deleted successfully');
}

