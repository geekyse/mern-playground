import {Router} from 'express';

import {create, createValidator} from './create';
import {get} from './get';
import {login, loginValidator} from "./login";

const routes = Router();
routes.get("/:id", get);
routes.post('/',createValidator,create);
routes.post('/login',loginValidator,login);

export {routes}