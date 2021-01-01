import {Router} from 'express';
import {userRoutes} from "./user/routes";
import {productRoutes} from "./product/routes";

const routes: Router = Router();

routes.use('/user', userRoutes);
routes.use('/product', productRoutes);

export {routes as allRoutes};
