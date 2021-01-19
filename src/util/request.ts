import {echo} from './debug';
import {HttpError} from "../errors";
import {UserSession} from "../models/UserSession";
import {User} from "../models/user";


export const generateFilterCondition = async (filter) => {
    let whereObject = {};
    if (!filter) {
        return whereObject;
    }

    Object.keys(filter).forEach((key) => (filter[key] == null) && delete filter[key]);
    Object.keys(filter).map(key => {
        // check for boolean
        if (typeof filter[key] == 'number' || filter[key] == 'true' || filter[key] == 'false') {
            whereObject[key] = filter[key];
        } else {
            whereObject[key] = new RegExp(filter[key], 'i');
        }
    });
    return whereObject;
};

export async function getPageData(req: any, model: any): Promise<object> {
    const {sortBy, page, pageSize} = await getGridParams(req);
    const filter = req.query.filter ? req.query.filter : {};
    const whereObject = await generateFilterCondition(filter);

    try {
        const total = await model.countDocuments(whereObject)

        let skip = (total > pageSize && page != 1) ? (pageSize * (page - 1)) : 0;
        skip = skip < 0 ? 0 : skip;

        const data = await model.find(whereObject)
            .sort(sortBy)
            .limit(pageSize)
            .skip(skip)
            .exec();

        // data.map(function (item) {
        //     // @ts-ignore
        //     return model.format(item);
        // })

        return {
            data,
            total,
            page,
            pageSize,
            skip,
            sortBy,
            filters: filter,
        };
    } catch (e) {
        console.log(e);
        return {};
    }
}

export const getGridParams = async (req) => {

    let sort = req.query.sort?.toUpperCase() || -1;
    if (sort !== 'ASC' && sort !== 'DESC') {
        sort = 'DESC';
    }

    let pageSize = req.query.pageSize || 25;
    let page = req.query.page || 1;
    let sortBy = req.query.sortField || 'createdAt';

    if (sortBy == 'undefined') {
        sortBy = 'createdAt';
    }
    sortBy = (sort == 'ASC') ? sortBy : '-' + sortBy;

    pageSize = parseInt(pageSize, 10);
    page = parseInt(page, 10);

    return {sort, sortBy, page, pageSize};
};

// export const Authenticate = async (req, res, next) => {
//     const token = req.headers['x-user-token'] ?? '';
//     if (!token) {
//         console.log('Authenticate: no x-user-token');
//
//         return next();
//     } else {
//         console.log(`Authenticate: x-user-token: ${token}`);
//
//     }
//
//     const session = await CustomerSession.findOne({token});
//
//     if (session) {
//         console.log('Authenticate: session found');
//
//         const user = await Customer.findOne({_id: session.userId});
//         if (user) {
//             echo('Authenticate: user found');
//             req.userToken = token;
//             // @ts-ignore
//             req.user = await Customer.format(user);
//             return next();
//         } else {
//             echo(user);
//             echo('Authenticate: user not found');
//         }
//     } else {
//         echo('Authenticate: no valid session found');
//
//     }
//     return next();
// };

export const AuthenticateAdmin = async (req, res, next) => {
    const token = req.headers['x-admin-token'] ?? '';
    if (!token) {
        console.log('AuthenticateAdmin: no x-admin-token');
        return next();
    } else {
        console.log(`AuthenticateAdmin: x-admin-token: ${token}`);

    }

    const session = await UserSession.findOne({token});

    if (session) {
        console.log('AuthenticateAdmin: session found');

        const user = await User.findOne({_id: session.userId});
        if (user) {
            echo('AuthenticateAdmin: user found');

            req.adminToken = token;
            // @ts-ignore
            req.admin = await User.format(user);
            return next();
        } else {
            echo(user);
            echo('AuthenticateAdmin: user not found');
        }
    } else {
        echo('AuthenticateAdmin: no valid session found');

    }
    return next();
};

export const isAuthorized = async (req, res, next) => {

    if (!req.userToken || !req.user) {
        return next(new HttpError(401, 'UnAuthorized'));

    } else {
        return next();
    }

};

export const isAuthorizedAdmin = async (req, res, next) => {
    if (!req.adminToken || !req.admin) {
        return next(new HttpError(401, 'UnAuthorized Admin'));

    } else {
        return next();
    }

};

export const NotFoundError = () => {
    return ValidationError('', 'Record not found', 404);
};

export const ValidationError = (field: string, error: string, status = 400) => {

    return {
        'status': status,
        'name': 'Error',
        'message': error,
        'errors': [
            {
                'value': '',
                'msg': error,
                'param': field,
                'location': 'body',
            },
        ],
    };
};

export const ServerError = (error: string = '', status = 500) => {

    return {
        'status': status ? status : 'Server Error',
        'name': 'Error',
        'message': error,
        'errors': [],
    };
};
