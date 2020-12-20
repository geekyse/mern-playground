import {Router} from 'express';
import {list, listValidator} from './list';

const routes: Router = Router();
routes.get('/', listValidator, catchAsyncErrors(list));


function print (lable : {lable : string}){
    
}


export {routes as UsersSessionsRoutes};
