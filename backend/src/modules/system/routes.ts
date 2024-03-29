import { Router } from 'express';
import { userRoutes } from './user/routes';
import { isAuthorizedAdmin } from '../../util/request';
import { catchAsyncErrors } from '../../util/router';
import { toCsv } from '../../server/data';
import { productRoutes } from './product/routes';
import { categoryRoutes } from './category/routes';
import { swatchRoutes } from './swatch/routes';

const routes: Router = Router();

routes.use('/system/user', userRoutes);
routes.use('/system/product', productRoutes);
routes.use('/system/category', categoryRoutes);
routes.use('/system/swatch', swatchRoutes);
routes.post('/export',isAuthorizedAdmin, catchAsyncErrors(toCsv));

export { routes as allRoutes };
