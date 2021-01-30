import {Router} from 'express';
import {userRoutes} from "./user/routes";

const routes: Router = Router();

routes.use('/user', userRoutes);

export {routes as allRoutes};
