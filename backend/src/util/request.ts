import { echo } from './debug';
import { HttpError } from '../errors';
import { UserSession } from '../models/UserSession';
import { User } from '../models/User';
import { redisConnection } from '../server/db';

export const generateFilterCondition = async (filter) => {
  let whereObject = {};
  if (!filter) {
    return whereObject;
  }

  Object.keys(filter).forEach((key: string) => (filter[key] == null) && delete filter[key]);
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

// Return data listed for pagination
export async function getPageData(req: any, model: any, filtersss: string): Promise<object> {
  const { sortBy, page, pageSize } = await getGridParams(req);
  const filter = req.query.filter ? req.query.filter : {};

  const whereObject = await generateFilterCondition(filter);

  try {
    const total = await model.countDocuments({ userId : filtersss });
    let skip = (total > pageSize && page != 1) ? (pageSize * (page - 1)) : 0;
    skip = skip < 0 ? 0 : skip;

    const data = await model.find({ userId : filtersss })
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

  return { sort, sortBy, page, pageSize };
};

export const AuthenticateAdmin = async (req, res, next) => {
  const token = req.headers['x-admin-token'] ?? '';

  if (!token) {
    console.log('AuthenticateAdmin: no x-admin-token');
    return next();
  } else {
    console.log(`AuthenticateAdmin: x-admin-token: ${token}`);
  }
  // get session from redis first
  let session = await redisConnection().get('admin_session_key');
  if (session) {
    session = JSON.parse(session);
    req.adminToken = session.adminToken;
    // @ts-ignore
    req.admin = await User.format(user);
    return next();

  } else {

    // get session from mongodb if no\'t in redis
    session = await UserSession.findOne({ token });
    if (session) {
      const user = await User.findOne({ _id: session.userId });
      if (user) {
        req.adminToken = token;
        // @ts-ignore


        req.admin = await User['User'].format(user);

        return next();
      } else {
        echo(user);
      }
    }

  }
  console.log('Session not found please login.');
  return next();
};

// Check if user token exists (token in cookies react saved after login)
export const isAuthorized = async (req, res, next) => {
  if (!req.userToken || !req.user) {
    return next(new HttpError(401, 'UnAuthorized'));
  } else {
    return next();
  }
};

// Check if admin token exists (token in cookies react saved after login)
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
    // 'name': 'Error',
    'message': error,
    'errors': [
      {
        // 'value': '',
        'msg': error,
        'param': field,
        // 'location': 'body',
      },
    ],
  };
};

export const ServerError = (error: string = '', status = 500) => {
  return {
    'status': status ? status : 'Server Error',
    // 'name': 'Error',
    'message': error,
    // 'errors': [],
  };
};

export const getUserByToken = async (adminToken: string) => {
  // @todo maintain not fount user session
  const session = await UserSession.findOne({ token: adminToken });
  return session['userId'];
};
