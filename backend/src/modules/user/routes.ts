import {Router} from 'express';
import {create, createValidator} from './create';
import {get, getValidator} from './get';
import {login, loginValidator} from "./login";
import {update, updateValidator} from "./update";
import {UsersSessionsRoutes} from "./session/routes";
import {list, listValidator} from "./list";
import {isAuthorized} from "../../util/request";
// import {getByToken} from "./get-by-token";

const Routes = Router();
    Routes.use('/session', UsersSessionsRoutes);
    // Routes.get("/:token", getByToken, getByToken);
    Routes.get("/:id",isAuthorized, getValidator, get);
    Routes.post('/',createValidator, create);
    Routes.get('/', isAuthorized,listValidator, list);
    Routes.put("/:id",isAuthorized, updateValidator, update);
    Routes.post('/login', loginValidator, login);
export {Routes as userRoutes}
