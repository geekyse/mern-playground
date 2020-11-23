import {Router} from 'express';

import {create, createValidator} from './create';
import {get} from './get';

const userRoutes = Router();
userRoutes.get("/:id", get);
userRoutes.post('/user',createValidator,create);

export {userRoutes}