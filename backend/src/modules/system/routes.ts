import { Router } from 'express';
import { userRoutes } from './user/routes';
import { customerRoutes } from './customer/routes';
import { isAuthorizedAdmin } from '../../util/request';
import { catchAsyncErrors } from '../../util/router';
import { toCsv } from './customer/export';

const routes: Router = Router();

routes.use('/system/user', userRoutes);
routes.use('/system/customer', customerRoutes);
routes.post('/export',isAuthorizedAdmin, catchAsyncErrors(toCsv));

export { routes as allRoutes };
