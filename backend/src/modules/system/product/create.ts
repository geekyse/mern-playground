import { body } from 'express-validator';
import { getUserByToken, ServerError } from '../../../util/request';
import { BaseValidationType } from '../../../types/validators';
import { reqValidationResult } from '../../../types/req-validation-result';
import { Product } from '../../../models/Product';
import { cleanProductUrl } from './helpers';
import Hash from 'sha1';
import { cleanSwatch } from '../../../util/string';

export const createValidator: BaseValidationType = [
  body('title').notEmpty().isString().isLength({ min: 4 }).trim(),
  body('description').optional().isString().isLength({ max: 500 }).trim(),
  body('type').notEmpty().isString(),
  body('vendor').notEmpty().isString(),
  body('category').notEmpty().isString(),
  body('brand').optional().isString().isLength({ max: 100 }),
  body('price.sellPrice').notEmpty().toFloat(),
  body('price.costPrice').optional(),
  body('swatch.colors').isString(),
  body('swatch.sizes').isString(),
  body('swatch.styles').isString(),
  reqValidationResult];

export async function create(req: any, res: any): Promise<void> {

  const { body } = req;
  const productRow = new Product();
  const swatches = cleanSwatch(body.swatch.colors,body.swatch.sizes,body.swatch.styles)
  const url = cleanProductUrl(body.category, body.title, productRow.id);
  const userId = await getUserByToken(req.adminToken);

  productRow.title = body.title;
  productRow.userId = userId;
  productRow.url = url;
  productRow.urlHash = Hash(url);
  productRow.category = body.category;
  productRow.description = body.description;
  productRow.vendor = body.vendor;
  productRow.brand = body.brand;
  productRow.type = body.type;
  productRow.price = body.price;
  productRow.swatch.colors = swatches.color;
  productRow.swatch.sizes = swatches.size;
  productRow.swatch.styles = swatches.style;

  console.info(productRow);

  try {
    await productRow.save();
    res.json(productRow);
  } catch (e) {
    res.status(500).json(ServerError(e.message));
  }
}
