"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRoutes = void 0;
const express_1 = require("express");
const routes_1 = require("./setting/routes");
const routes = express_1.Router();
exports.publicRoutes = routes;
routes.use('/setting/', routes_1.settingRoutes);
