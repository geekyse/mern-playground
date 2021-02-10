import {Router} from 'express';
import {get, getValidator} from './get';
import {update, updateValidator} from './update';
import {deleteRow, deleteValidator} from './delete';
import {list, listValidator} from './list';
import {create, createValidator} from './create';
import {isAuthorizedAdmin} from "../../../util/request";
import {catchAsyncErrors} from "../../../util/router";
import {loginAction, loginValidator} from "./login";
import {CustomersSessionsRoutes} from "./session/routes";

const routes: Router = Router();
routes.use('/session', CustomersSessionsRoutes);
routes.post('/', isAuthorizedAdmin, createValidator, catchAsyncErrors(create));
routes.post('/login', isAuthorizedAdmin, loginValidator, catchAsyncErrors(loginAction));
routes.get('/', isAuthorizedAdmin, listValidator, catchAsyncErrors(list));
routes.get('/:id', isAuthorizedAdmin, getValidator, catchAsyncErrors(get));
routes.put('/:id', isAuthorizedAdmin, updateValidator, catchAsyncErrors(update));
routes.delete('/:id', isAuthorizedAdmin, deleteValidator, catchAsyncErrors(deleteRow));


export {routes as customerRoutes};
