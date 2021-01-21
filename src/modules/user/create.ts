import {User} from "../../models/user";
import {body} from "express-validator";
import {BaseValidationType} from "../../types/validators";
import {reqValidationResult} from "../../types/req-validation-result";
import {ServerError, ValidationError} from "../../util/request";
import {hashPassword} from "../../util/string";
import {Publish} from "../../util/rabbit";

export const createValidator: BaseValidationType = [
    body("userName").notEmpty().isString().trim().escape(),
    body("firstName").notEmpty().isString().trim().escape(),
    body("lastName").isString().isLength({min: 1, max: 25}).trim().escape(),
    body("bio").isString(),
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
    const {body} = req;
    const hashedPassword = hashPassword(body.password);
    const userRow = new User();
    userRow.userName = body.userName;
    userRow.firstName = body.firstName;
    userRow.lastName = body.lastName;
    userRow.bio = body.bio;
    userRow.address = body.address;
    userRow.city = body.city;
    userRow.country = body.country;
    userRow.education = body.education;
    userRow.work = body.work;
    userRow.email = body.email;
    userRow.password = hashedPassword;
    userRow.about = body.about;
    userRow.isActive = true;

    const userExist = await User.count({email: userRow.email});
    if (userExist > 0) {
        res.status(400).json(ValidationError('email', 'This is email already registered'));
        return;
    }

    const userNameExist = await User.count({userName: userRow.userName});
    if (userNameExist > 0) {
        res.status(400).json(ValidationError('userName', 'This is user name already exist'));
        return;
    }

    try {
        await userRow.save();
        res.json(userRow);
    } catch (e) {
        res.status(500).json(ServerError(e.message));
    }
    await Publish(userRow, 'createUser')
}
