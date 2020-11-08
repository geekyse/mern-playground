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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandSchema = exports.Brand = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_slug_updater_1 = __importDefault(require("mongoose-slug-updater"));
mongoose_1.default.plugin(mongoose_slug_updater_1.default);
const BrandSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: false,
    },
    about: {
        type: String,
        required: false,
    },
    slug: { type: String, slug: "name", unique: true, slugPaddingSize: 4, permanent: true },
    langs: {
        type: Object,
        required: false,
        index: true,
    }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, versionKey: false });
exports.BrandSchema = BrandSchema;
const Brand = mongoose_1.default.model('brand', BrandSchema);
exports.Brand = Brand;
