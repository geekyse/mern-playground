import {Router} from 'express';

import {create, createValidator} from './create';
import {get, getValidator} from './get';
import {login, loginValidator} from "./login";
import {update, updateValidator} from "./update";
import {UsersSessionsRoutes} from "./session/routes";

const Routes = Router();
    Routes.use('/session', UsersSessionsRoutes);
    Routes.get("/:id",getValidator, get);
    Routes.post('/',createValidator,create);
    Routes.put("/:id",updateValidator, update);
    Routes.post('/login',loginValidator,login);
export {Routes as userRoutes}