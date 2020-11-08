import {Router} from 'express';
import {create, createValidator} from './create';
import {catchAsyncErrors} from "../../util/router";

const routes: Router = Router();
routes.post('/', createValidator, catchAsyncErrors(create));


export {routes as settingRoutes};
