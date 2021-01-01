import {body} from 'express-validator';
import {reqValidationResult} from "../../types/req-validation-result";
import {BaseValidationType} from "../../types/validators";
import {Product} from "../../models/product";

export const UpdateValidator: BaseValidationType = [
    body("name").notEmpty().isString(),
    body("brand").notEmpty().isString(),
    body("quantity").notEmpty().isNumeric(),
    body("images").notEmpty().isString(),
    body("longDescription").notEmpty().isString(),
    body("shortDescription").notEmpty().isString(),
    body("price").notEmpty().isString(),
    reqValidationResult,
];
export async function update(req: any, res: any): Promise<void> {
    const {body} = req;

    const product = await Product.findOne({_id: req.params.id});
    if (!product) {
        return res.json(404, 'error product doesn\'t exists');
    }


    Object.keys(body).map((key) => {
        product[key] = body.hasOwnProperty(key) ? body[key] : product[key];
    });

    try {
        const saveProduct = await product.save();
        res.json(saveProduct);
    } catch (e) {
        console.log(e);
        res.status(500).json({'error': e.message});
    }
}

