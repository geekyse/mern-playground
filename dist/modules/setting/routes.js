"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingRoutes = void 0;
const express_1 = require("express");
const create_1 = require("./create");
const router_1 = require("../../util/router");
const routes = express_1.Router();
exports.settingRoutes = routes;
routes.post('/', create_1.createValidator, router_1.catchAsyncErrors(create_1.create));
