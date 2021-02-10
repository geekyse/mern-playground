import {User} from "../../models/User";
import {BaseValidationType} from "../../types/validators";
import {reqValidationResult} from "../../types/req-validation-result";
import {ServerError, ValidationError} from "../../util/request";
import {hashPassword} from "../../util/string";
import {body} from "express-validator";

export const createValidator: BaseValidationType = [
    body("userName").notEmpty().isString().trim().escape(),
    body("firstName").notEmpty().isString().trim().escape(),
    body("lastName").isString().isLength({min: 1, max: 25}).trim().escape(),
    body("bio"),
    body("address"),
    body("city"),
    body("country"),
    body("education"),
    body("work"),
    body("about"),
    body("email").notEmpty().isEmail().normalizeEmail(),
    body("password"),
    reqValidationResult,
];

export async function create(req: any, res: any): Promise<void> {
    // get data from request body and set them to a constant
    const {body} = req;

    // hashing password before being saved in mongo
    const hashedPassword = hashPassword(body.password);

    const userRow = new User();
    userRow.userName = body.userName;
    userRow.firstName = body.firstName;
    userRow.lastName = body.lastName;
    userRow.bio = body.bio;
    userRow.address = body.address;
    userRow.email = body.email;
    userRow.password = hashedPassword;
    userRow.isActive = true;

    // unique email
    const userExist = await User.count({email: userRow.email});
    if (userExist > 0) {
        res.status(400).json(ValidationError('email', 'This email already registered'));
        return;
    }

    // unique user name
    const userNameExist = await User.count({userName: userRow.userName});
    if (userNameExist > 0) {
        res.status(400).json(ValidationError('userName', 'This user name already exist',400));
        return;
    }

    try {
        await userRow.save();
        res.json(userRow);
    } catch (e) {
        res.status(500).json(ServerError(e.message,500));
    }
}
