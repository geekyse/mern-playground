"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreSchema = exports.Store = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const StoreSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    currencies: {
        type: Array,
        required: true,
    },
    defaultCurrency: {
        type: String,
        required: true,
    },
    languages: {
        type: Array,
        required: true,
    },
    defaultLanguage: {
        type: String,
        required: true,
    },
    paymentMethods: {
        type: Array,
        required: true,
    },
    shippingMethods: {
        type: Array,
        required: true,
    },
    isPublished: {
        type: Boolean,
        required: true,
        index: true
    },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, versionKey: false });
exports.StoreSchema = StoreSchema;
const Store = mongoose_1.default.model('store', StoreSchema);
exports.Store = Store;
