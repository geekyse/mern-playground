import {Router} from 'express';

import {create, createValidator} from './create';
import {get, getValidator} from './get';
import {login, loginValidator} from "./login";
import {update, updateValidator} from "./update";

const userRoutes = Router();
    userRoutes.get("/:id",getValidator, get);
    userRoutes.post('/',createValidator,create);
    userRoutes.put("/:id",updateValidator, update);
    userRoutes.post('/login',loginValidator,login);

export {userRoutes}