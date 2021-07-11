import { Router } from 'express';
import { get, getValidator } from './get';
import { deleteRow, deleteValidator } from './delete';
import { create, createValidator } from './create';
import { isAuthorizedAdmin } from '../../../util/request';
import { catchAsyncErrors } from '../../../util/router';
import { list, listValidator } from './list';

const routes: Router = Router();

routes.post('/', isAuthorizedAdmin, createValidator, catchAsyncErrors(create));
routes.get('/', isAuthorizedAdmin, listValidator, catchAsyncErrors(list));
routes.get('/:id', isAuthorizedAdmin, getValidator, catchAsyncErrors(get));
routes.delete('/:id', isAuthorizedAdmin, deleteValidator, catchAsyncErrors(deleteRow));

export { routes as productRoutes };
