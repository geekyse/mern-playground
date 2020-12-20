import {User} from "../../models/user";
import {body} from "express-validator";
import {BaseValidationType} from "../../types/validators";
import {reqValidationResult} from "../../types/req-validation-result";
import {hashPassword} from "../../helpers/string";
import {ServerError, ValidationError} from "../../util/request";

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

// export async function create(req: any, res: any) {
//   const body = req.body;
//
//   const userExist = await User.countDocuments({ email: req.body.email });
//   if (userExist > 0) {
//     return res.json(400, "Email already registered");
//   }
//   // set request data to the object
//   const user = new User({
//     bio: body.bio,
//     userName: body.userName,
//     firstName: body.firstName,
//     lastName: body.lastName,
//     email: body.email,
//     password: passwordHash.generate(body.password),
//     address: body.address,
//     city: body.city,
//     country: body.country,
//     education: body.education,
//     work: body.work,
//     about: body.about,
//     friends: body.friends,
//     isActive: true,
//   });
//   // Errors check while saving user
//   try {
//     const newUser = await user.save();
//     res.json(201, { newUser });
//   } catch (err) {
//     res.json(400, { message: err.message });
//   }
// }

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

    try {
        await userRow.save();
        res.json(userRow);
    } catch (e) {
        res.status(500).json(ServerError(e.message));
    }
}
