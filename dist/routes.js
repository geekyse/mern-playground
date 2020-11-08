"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allRoutes = void 0;
const express_1 = require("express");
const routes_1 = require("./modules/routes");
const routes = express_1.Router();
exports.allRoutes = routes;
routes.use('/', routes_1.publicRoutes);
