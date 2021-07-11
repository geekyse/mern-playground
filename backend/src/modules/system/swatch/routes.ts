import {Router} from 'express';
import {get, getValidator} from './get';
import {create, createValidator} from './create';
import {isAuthorizedAdmin} from "../../../util/request";
import {catchAsyncErrors} from "../../../util/router";

const routes: Router = Router();
routes.post('/', isAuthorizedAdmin, createValidator, catchAsyncErrors(create));
routes.get('/:id', isAuthorizedAdmin, getValidator, catchAsyncErrors(get));

export {routes as swatchRoutes};
