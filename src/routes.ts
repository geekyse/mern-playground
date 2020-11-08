import {Router} from 'express';
import {publicRoutes} from "./modules/routes";

const routes: Router = Router();

routes.use('/', publicRoutes);

export {routes as allRoutes};
