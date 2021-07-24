import { Router } from 'express';
// import { list, listValidator } from './list';
import { isAuthorizedAdmin } from '../../../../util/request';
import { catchAsyncErrors } from '../../../../util/router';
import { deleteSession, deleteValidator } from './delete';

const routes: Router = Router();
// routes.get('/', isAuthorizedAdmin, listValidator, catchAsyncErrors(list));
routes.post('/', isAuthorizedAdmin, deleteValidator, catchAsyncErrors(deleteSession));

export { routes as UsersSessionsRoutes };
