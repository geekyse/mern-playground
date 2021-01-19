import {body} from "express-validator";
import {BaseValidationType} from "../../types/validators";
import {reqValidationResult} from "../../types/req-validation-result";
import {ServerError, ValidationError} from "../../util/request";
import {Product} from "../../models/product";

export const createValidator: BaseValidationType = [
    body("name").notEmpty().isString(),
    body("media").notEmpty().isString(),
    body("quantity").notEmpty().isNumeric(),
    body("price").notEmpty().isNumeric(),
    body("type").notEmpty().isString(),
    body("brand").notEmpty().isString(),
    body("vendor").notEmpty().isString(),
    body("longDescription").notEmpty().isString(),
    body("shortDescription").notEmpty().isString(),
    reqValidationResult,
];



export async function create(req: any, res: any): Promise<void> {
    const {body} = req;
    const productData = new Product();

    productData.name = body.name;
    productData.media = body.media;
    productData.quantity = body.quantity;
    productData.price = body.price;
    productData.type = body.type;
    productData.brand = body.brand;
    productData.vendor = body.vendor;
    productData.shortDescription = body.shortDescription;
    productData.longDescription = body.longDescription;

    const productExist = await Product.count({name: productData.name});
    if (productExist > 0) {
        res.status(400).json(ValidationError('product', 'This product is already registered'));
        return;
    }

    try {
        await productData.save();
        res.json(productData);
    } catch (e) {
        res.status(500).json(ServerError(e.message));
    }
}
