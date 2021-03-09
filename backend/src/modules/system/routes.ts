import { Router } from 'express';
import { userRoutes } from './user/routes';
import { customerRoutes } from './customer/routes';

const routes: Router = Router();

declare namespace Express {
  export interface Request {
    tenant?: string
  }
}
routes.use((req, res, next) => {
  req.tenant = 'tenant-X'
  next()
})

routes.use('/system/user', userRoutes);
routes.use('/system/customer', customerRoutes);

export { routes as allRoutes };
