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
exports.BaseCartSchema = exports.CartSchema = exports.Cart = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const BaseCartSchema = new mongoose_1.Schema({
    store: {
        type: Object,
        required: false,
    },
    currency: {
        type: Object,
        required: false,
    },
    customer: {
        type: Object,
        required: false,
    },
    products: {
        type: [],
        required: false,
    },
    totals: {
        type: Object,
        required: true,
    },
    displayTotals: {
        type: Object,
        required: true,
    },
    meta: {
        type: Object,
        required: false,
    },
    shipping: {
        shippingMethod: String,
        shippingStatus: Number,
        shippingAddress: {
            country: String,
            addressLine1: String,
            addressLine2: String,
            landMark: String,
        },
        required: false,
    },
    payment: {
        paymentMethod: String,
        paymentStatus: String,
        paymentStatusMessage: String,
        paymentDetails: Object,
        required: false,
    },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, versionKey: false });
exports.BaseCartSchema = BaseCartSchema;
const CartSchema = BaseCartSchema;
exports.CartSchema = CartSchema;
CartSchema.methods.addProduct = function (product, qty) {
    const isExist = this.isProductExist(product.id);
    if (isExist) {
        this.updateProductQty(product.id, qty);
    }
    else {
        const displayCurrencyRate = this.getDisplayCurrencyRate();
        let cartProduct = {
            id: product.id,
            title: product.title,
            slug: product.slug,
            description: product.description,
            vendor: product.vendor,
            brand: product.brand,
            originCountry: product.originCountry,
            type: product.type,
            variants: product.variants,
            media: product.media,
            tags: product.tags,
            langs: product.langs,
            collections: product.collections,
            price: null,
            displayPrice: null,
            isValid: true, qty
        };
        cartProduct.price = {
            taxable: product.price.taxable,
            base: product.price.sellPrice,
            tax: 0,
            discount: 0,
            total: product.price.sellPrice * qty,
        };
        cartProduct.displayPrice = {
            taxable: product.price.taxable,
            base: product.price.sellPrice * displayCurrencyRate,
            tax: 0,
            discount: 0,
            total: product.price.sellPrice * displayCurrencyRate * qty,
        };
        // push the new product
        this.products = [...this.products, cartProduct];
    }
    this.calculateTotals();
};
CartSchema.methods.removeProduct = function (productId) {
    if (!this.products) {
        return;
    }
    for (let [i, product] of this.products.entries()) {
        if (product.id == productId) {
            delete this.products[i];
        }
    }
    this.products = this.products.filter(function (el) {
        return el != null;
    });
    this.calculateTotals();
};
CartSchema.methods.isProductExist = function (productId) {
    if (!this.products) {
        return false;
    }
    for (let [i, product] of this.products.entries()) {
        if (product.id == productId) {
            return true;
        }
    }
    return false;
};
CartSchema.methods.updateProductQty = function (productId, qty) {
    if (!this.products) {
        return false;
    }
    let isChecked = false;
    // const displayCurrencyRate = this.getDisplayCurrencyRate();
    for (let [i, product] of this.products.entries()) {
        if (product.id == productId) {
            if (!isChecked) {
                isChecked = true;
                this.products[i] = Object.assign(Object.assign({}, product), { qty: qty });
                // newProduct.price = {
                //     taxable: newProduct.price.taxable,
                //     base: newProduct.price.base,
                //     tax: 0,
                //     discount: 0,
                //     total: newProduct.price.base * qty,
                // }
                // newProduct.displayPrice = {
                //     taxable: newProduct.price.taxable,
                //     base: newProduct.price.base * displayCurrencyRate,
                //     tax: 0,
                //     discount: 0,
                //     total: newProduct.price.base * displayCurrencyRate * qty,
                // }
                this.products = this.products.filter(function (el) {
                    return el != null;
                });
            }
            else {
                delete this.products[i];
                this.products = this.products.filter(function (el) {
                    return el != null;
                });
            }
        }
    }
    return false;
};
CartSchema.methods.getDisplayCurrencyRate = function () {
    return (this.currency && this.currency.displayCurrencyRate) ? this.currency.displayCurrencyRate : 1;
};
CartSchema.methods.calculateTotals = function () {
    let total = 0;
    let tax = 0;
    let subtotal = 0;
    let discount = 0;
    for (let product of this.products) {
        tax += product.price.tax * product.qty;
        subtotal += product.price.base * product.qty;
        discount += product.price.discount * product.qty;
        total += product.price.total * product.qty;
    }
    const displayCurrencyRate = this.getDisplayCurrencyRate();
    this.totals = {
        total: total,
        tax: tax,
        subtotal: subtotal,
        discount: discount,
    };
    this.displayTotals = {
        total: total * displayCurrencyRate,
        tax: tax * displayCurrencyRate,
        subtotal: subtotal * displayCurrencyRate,
        discount: discount * displayCurrencyRate,
    };
};
const Cart = mongoose_1.default.model('cart', CartSchema);
exports.Cart = Cart;
