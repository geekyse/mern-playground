"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_slug_updater_1 = __importDefault(require("mongoose-slug-updater"));
mongoose_1.default.plugin(mongoose_slug_updater_1.default);
const { Schema } = mongoose_1.default;
const PriceSchema = {
    sellPrice: {
        type: Number,
        required: true,
    },
    costPrice: {
        type: Number,
        required: false,
    },
    comparePrice: {
        type: Number,
        required: false,
    },
    margin: {
        type: Number,
        required: false,
    },
    profit: {
        type: Number,
        required: false,
    },
    taxable: {
        type: Boolean,
        required: false,
        default: true,
    },
};
const ProductInventorySchema = {
    sku: {
        type: String,
        required: false,
    },
    barcode: {
        type: String,
        required: false,
    },
    trackQty: {
        type: Boolean,
        required: false,
        default: true,
    },
    sellOnNoStock: {
        type: Boolean,
        required: false,
    },
    qty: {
        type: Number,
        required: false,
        default: 0
    },
};
const ProductShippingSchema = {
    isPhysical: {
        type: Boolean,
        required: false,
        default: true,
    },
    weight: {
        type: Number,
        required: false,
        default: 0,
    },
    weightUnit: {
        type: String,
        required: false,
        default: 'kg',
    },
    HS: {
        type: String,
        required: false,
    },
};
const TagsSchema = [String];
const CollectionsSchema = [String];
const MediaSchema = Array();
const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
        text: true,
        index: true,
    },
    slug: { type: String, slug: "title", unique: true, slugPaddingSize: 4, permanent: true },
    description: {
        type: String,
        required: false,
        text: true,
        index: true,
    },
    longDescription: {
        type: String,
        required: false,
        text: true,
        index: true,
    },
    type: {
        type: String,
        required: true,
        index: true
    },
    vendor: {
        type: String,
        required: true,
        index: true
    },
    brand: {
        type: String,
        required: false,
        index: true
    },
    originCountry: {
        type: String,
        required: true,
        index: true
    },
    price: PriceSchema,
    inventory: ProductInventorySchema,
    shipping: ProductShippingSchema,
    createdAt: { type: Date, default: Date.now },
    isPublished: {
        type: Boolean,
        index: true
    },
    media: {
        type: Array,
        required: false,
    },
    variants: {
        type: Array,
        required: false,
        index: true,
    },
    tags: {
        type: TagsSchema,
        index: true,
    },
    collections: {
        type: CollectionsSchema,
    },
    stores: {
        type: Array,
        required: false,
        index: true,
    },
    channels: {
        type: Array,
        required: false,
        index: true,
    },
    langs: {
        type: Object,
        required: false,
        index: true,
    },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, versionKey: false });
// @ts-ignore
ProductSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
// Ensure virtual fields are serialised.
// @ts-ignore
ProductSchema.set('toJSON', {
    virtuals: true
});
ProductSchema.set('toObject', {
    virtuals: true
});
ProductSchema.index({ name: 'text', 'description': 'text', 'longDescription': 'text' });
const Product = mongoose_1.default.model('product', ProductSchema);
exports.Product = Product;
