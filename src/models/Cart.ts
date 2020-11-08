import mongoose, {Document, Schema} from "mongoose";
import {IProduct} from "./Product";

interface ICartProduct {
    id: string;
    title: string;
    slug: string;
    description: string;
    vendor: string;
    brand: string;
    originCountry: string;
    type: string;
    variants: Object[];
    media: {
        filename: string,
    }[],
    tags: String[];
    langs: Object;
    collections: String[];
    price: {
        taxable: boolean,
        base: number,
        tax: number,
        discount: number,
        total: number,
    };
    displayPrice: {
        taxable: boolean,
        base: number,
        tax: number,
        discount: number,
        total: number,
    };

    qty: number;
    isValid: boolean,
}

interface ITotals extends Document {
    total: number,
    tax: number,
    shipping: number,
    subtotal: number,
    discount: number,
}

interface ICart extends Document {
    store: {
        id: string,
    }
    customer: {
        customerId: string,
        customerEmail: string,
    },
    currency: {
        currency: string,
        displayCurrency: string,
        displayCurrencyRate: number,
    },
    products: ICartProduct[],
    totals: ITotals,
    displayTotals: ITotals,
    meta: object,
    status: number,
    statusMessage: string,
    shipping: {
        shippingMethod: string,
        shippingStatus: number,
        shippingStatusMessage: string,
        shippingAddress: {
            country: string,
            addressLine1: string,
            addressLine2: string,
            landMark: string,
        }
    },
    payment: {
        paymentMethod: string,
        paymentType: string,
        paymentStatus: number,
        paymentStatusMessage: string,
        paymentDetails: object
    },

    addProduct(id, qty): void;

    removeProduct(id: any);
}

const BaseCartSchema = new Schema({
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

}, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}, versionKey: false});
const CartSchema = BaseCartSchema

CartSchema.methods.addProduct = function (product: IProduct, qty: number) {

    const isExist = this.isProductExist(product.id);
    if (isExist) {
        this.updateProductQty(product.id, qty);
    } else {
        const displayCurrencyRate = this.getDisplayCurrencyRate();
        let cartProduct: ICartProduct = {
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
        }
        cartProduct.displayPrice = {
            taxable: product.price.taxable,
            base: product.price.sellPrice * displayCurrencyRate,
            tax: 0,
            discount: 0,
            total: product.price.sellPrice * displayCurrencyRate * qty,
        }

        // push the new product
        this.products = [...this.products, cartProduct];
    }


    this.calculateTotals();

};

CartSchema.methods.removeProduct = function (productId: string) {

    if (!this.products) {
        return
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

CartSchema.methods.isProductExist = function (productId: string) {

    if (!this.products) {
        return false
    }
    for (let [i, product] of this.products.entries()) {
        if (product.id == productId) {
            return true;
        }
    }
    return false;
}
CartSchema.methods.updateProductQty = function (productId: string, qty: number) {

    if (!this.products) {
        return false
    }
    let isChecked = false;
    // const displayCurrencyRate = this.getDisplayCurrencyRate();
    for (let [i, product] of this.products.entries()) {
        if (product.id == productId) {
            if (!isChecked) {
                isChecked = true;

                this.products[i] = {...product, qty: qty};

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
            } else {
                delete this.products[i];
                this.products = this.products.filter(function (el) {
                    return el != null;
                });
            }

        }
    }
    return false;
}

CartSchema.methods.getDisplayCurrencyRate = function () {
    return (this.currency && this.currency.displayCurrencyRate) ? this.currency.displayCurrencyRate : 1;
}
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
    }

};
const Cart = mongoose.model<ICart>('cart', CartSchema);

export {Cart, ICart, ICartProduct, CartSchema, BaseCartSchema}