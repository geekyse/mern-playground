import {body} from "express-validator";
import {BaseValidationType} from "../../types/validators";
import {reqValidationResult} from "../../types/req-validation-result";
import {ServerError, ValidationError} from "../../util/request";
import {Product} from "../../models/product";

export const createValidator: BaseValidationType = [
    body("name").notEmpty().isString(),
    body("brand").notEmpty().isString(),
    body("quantity").notEmpty().isNumeric(),
    body("images").notEmpty().isString(),
    body("longDescription").notEmpty().isString(),
    body("shortDescription").notEmpty().isString(),
    body("price").notEmpty().isString(),
    reqValidationResult,
];

export async function create(req: any, res: any): Promise<void> {
    const {body} = req;
    const productData = new Product();

    productData.name = body.name;
    productData.quantity = body.quantity;
    productData.brand = body.brand;
    productData.price = body.price;
    productData.images = body.images;
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
