"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = exports.ValidationError = exports.AuthenticateAdmin = exports.Authenticate = exports.getGridParams = exports.getPageData = exports.generateFilterCondition = void 0;
const debug_1 = require("./debug");
const UserSession_1 = require("../models/UserSession");
const User_1 = require("../models/User");
const CustomerSession_1 = require("../models/CustomerSession");
const Customer_1 = require("../models/Customer");
exports.generateFilterCondition = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    let whereObject = {};
    if (!filter) {
        return whereObject;
    }
    Object.keys(filter).forEach((key) => (filter[key] == null) && delete filter[key]);
    Object.keys(filter).map(key => {
        // check for boolean
        if (typeof filter[key] == 'number' || filter[key] == 'true' || filter[key] == 'false') {
            whereObject[key] = filter[key];
        }
        else {
            whereObject[key] = new RegExp(filter[key], 'i');
        }
    });
    return whereObject;
});
function getPageData(req, model) {
    return __awaiter(this, void 0, void 0, function* () {
        const { sortBy, page, pageSize } = yield exports.getGridParams(req);
        const filter = req.query.filter ? req.query.filter : {};
        const whereObject = yield exports.generateFilterCondition(filter);
        try {
            const total = yield model.countDocuments(whereObject);
            let skip = (total > pageSize && page != 1) ? (pageSize * (page - 1)) : 0;
            skip = skip < 0 ? 0 : skip;
            const data = yield model.find(whereObject)
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
        }
        catch (e) {
            console.log(e);
            return {};
        }
    });
}
exports.getPageData = getPageData;
exports.getGridParams = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let sort = ((_a = req.query.sort) === null || _a === void 0 ? void 0 : _a.toUpperCase()) || -1;
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
});
exports.Authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const token = (_b = req.headers['x-user-token']) !== null && _b !== void 0 ? _b : '';
    if (!token) {
        console.log('Authenticate: no x-user-token');
        return next();
    }
    else {
        console.log(`Authenticate: x-user-token: ${token}`);
    }
    const session = yield CustomerSession_1.CustomerSession.findOne({ token });
    if (session) {
        console.log('Authenticate: session found');
        const user = yield Customer_1.Customer.findOne({ _id: session.userId });
        if (user) {
            debug_1.echo('Authenticate: user found');
            req.userToken = token;
            // @ts-ignore
            req.user = yield Customer_1.Customer.format(user);
            return next();
        }
        else {
            debug_1.echo(user);
            debug_1.echo('Authenticate: user not found');
        }
    }
    else {
        debug_1.echo('Authenticate: no valid session found');
    }
    return next();
});
exports.AuthenticateAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const token = (_c = req.headers['x-admin-token']) !== null && _c !== void 0 ? _c : '';
    if (!token) {
        console.log('AuthenticateAdmin: no x-admin-token');
        return next();
    }
    else {
        console.log(`AuthenticateAdmin: x-admin-token: ${token}`);
    }
    const session = yield UserSession_1.UserSession.findOne({ token });
    if (session) {
        console.log('AuthenticateAdmin: session found');
        const user = yield User_1.User.findOne({ _id: session.userId });
        if (user) {
            debug_1.echo('AuthenticateAdmin: user found');
            req.adminToken = token;
            // @ts-ignore
            req.admin = yield User_1.User.format(user);
            return next();
        }
        else {
            debug_1.echo(user);
            debug_1.echo('AuthenticateAdmin: user not found');
        }
    }
    else {
        debug_1.echo('AuthenticateAdmin: no valid session found');
    }
    return next();
});
exports.ValidationError = (field, error, status = 400) => {
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
exports.ServerError = (error = '', status = 500) => {
    return {
        'status': status ? status : 'Server Error',
        'name': 'Error',
        'message': error,
        'errors': [],
    };
};
