"use strict";
exports.__esModule = true;
exports.allRoutes = void 0;
var express_1 = require("express");
var routes_1 = require("./user/routes");
var routes = express_1.Router();
exports.allRoutes = routes;
routes.use('/user', routes_1.userRoutes);
