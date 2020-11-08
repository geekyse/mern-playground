"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTypeOption = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const ProductTypeOptionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
    },
    langs: {
        type: Object,
        required: false,
        index: true,
    },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, versionKey: false });
const ProductTypeOption = mongoose_1.default.model('product_type_option', ProductTypeOptionSchema);
exports.ProductTypeOption = ProductTypeOption;
