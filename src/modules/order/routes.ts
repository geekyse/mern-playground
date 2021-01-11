import {Router} from 'express';

import {create, createValidator} from './create';
import {update, UpdateValidator} from "./update";

const Routes = Router();
Routes.post('/',createValidator,create);
Routes.put('/:id',UpdateValidator,update);

export {Routes as productRoutes}