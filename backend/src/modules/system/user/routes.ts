import {Router} from 'express';
import {create, createValidator} from './create';
import {get, getValidator} from './get';
import {login, loginValidator} from "./login";
import {update, updateValidator} from "./update";
import {UsersSessionsRoutes} from "./session/routes";
import {list, listValidator} from "./list";
import {isAuthorizedAdmin} from "../../../util/request";
import {catchAsyncErrors} from "../../../util/router";
import {deleteRow, deleteValidator} from "./delete";

const routes:Router = Router();
routes.use('/session', UsersSessionsRoutes);
routes.post('/login', loginValidator, login);
routes.post('/',createValidator, catchAsyncErrors(create));
routes.get('/', isAuthorizedAdmin,listValidator, catchAsyncErrors(list));
routes.get("/:id",isAuthorizedAdmin, getValidator, catchAsyncErrors(get));
routes.put("/:id",isAuthorizedAdmin, updateValidator, catchAsyncErrors(update));
routes.put("/:id",isAuthorizedAdmin, updateValidator, catchAsyncErrors(update));
routes.delete('/:id', isAuthorizedAdmin, deleteValidator, catchAsyncErrors(deleteRow));
export {routes as userRoutes}
