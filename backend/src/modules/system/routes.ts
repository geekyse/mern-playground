import {Router} from 'express';
import {userRoutes} from "./user/routes";
import {customerRoutes} from "./customer/routes";

const routes: Router = Router();

routes.use('/system/user', userRoutes);
routes.use('/system/customer', customerRoutes);

export {routes as allRoutes};
