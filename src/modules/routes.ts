import {Router} from 'express';
import {settingRoutes} from "./setting/routes";

const routes: Router = Router();

routes.use('/setting/', settingRoutes);

export {routes as publicRoutes};
