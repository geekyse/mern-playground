"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Cart_1 = require("./Cart");
const OrderSchema = Cart_1.BaseCartSchema;
const Order = mongoose_1.default.model('order', OrderSchema);
exports.Order = Order;
