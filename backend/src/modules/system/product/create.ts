import { body } from 'express-validator';
import { ServerError } from '../../../util/request';
import { BaseValidationType } from '../../../types/validators';
import { reqValidationResult } from '../../../types/req-validation-result';
import { Product } from '../../../models/Product';
import { cleanProductUrl } from './helpers';

export const createValidator: BaseValidationType = [
  body('title').notEmpty().isString().isLength({ min: 1, max: 25 }).trim(),
  body('description').optional().isString().isLength({ max: 500 }).trim(),
  body('type').notEmpty().isString(),
  body('vendor').notEmpty().isString(),
  body('category').notEmpty().isString(),
  body('brand').optional().isString().isLength({ max: 100 }),
  body('price.sellPrice').notEmpty().toFloat(),
  body('price.costPrice').optional(),
  reqValidationResult];

export async function create(req: any, res: any): Promise<void> {
  const { body } = req;
  const productRow = new Product();
  const url = cleanProductUrl(body.category, body.title, productRow.id);

  productRow.title = body.title;
  productRow.url = url;
  productRow.description = body.description;
  productRow.type = body.type;
  productRow.vendor = body.vendor;
  productRow.brand = body.brand;
  productRow.price = body.price;

  console.info(productRow);

  try {
    await productRow.save();
    res.json(productRow);
  } catch (e) {
    res.status(500).json(ServerError(e.message));
  }
}
