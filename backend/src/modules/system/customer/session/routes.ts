import {Router} from 'express';
import {list, listValidator} from './list';
import {isAuthorizedAdmin} from "../../../../util/request";
import {catchAsyncErrors} from "../../../../util/router";

const routes: Router = Router();
routes.get('/', isAuthorizedAdmin, listValidator, catchAsyncErrors(list));


export {routes as CustomersSessionsRoutes};
