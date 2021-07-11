import { getPageData, getUserByToken } from '../../../util/request';
import { BaseValidationType } from '../../../types/validators';
import { reqValidationResult } from '../../../types/req-validation-result';
import { query } from 'express-validator';
import { Product } from '../../../models/Product';

export const listValidator: BaseValidationType = [
  query('filter[title]').optional().isString(),
  query('filter[vendor]').optional().isString(),
  query('filter[category]').optional().isString(),
  reqValidationResult];

export async function list(req: any, res: any): Promise<void> {
  const userId = await getUserByToken(req.adminToken);
  let data = await getPageData(req, Product,userId);
  res.send(data);
}
