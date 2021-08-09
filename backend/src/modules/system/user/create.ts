import { User } from '../../../models/User';
import { body } from 'express-validator';
import { BaseValidationType } from '../../../types/validators';
import { reqValidationResult } from '../../../types/req-validation-result';
import { ServerError, ValidationError } from '../../../util/request';
import { hashPassword } from '../../../util/string';
import { isExistByEmail, isExistByUsername } from '../../../models/UserHelpers';
import { sendRegisterEmail } from 'src/util/mail';

export const createValidator: BaseValidationType = [
  body('userName').notEmpty().isString().trim().escape(),
  body('firstName').notEmpty().isString().trim().escape(),
  body('lastName').isString().isLength({ min: 1, max: 25 }).trim().escape(),
  body('bio'),
  body('address'),
  body('city'),
  body('country'),
  body('education'),
  body('work'),
  body('about'),
  body('email').notEmpty().isEmail().normalizeEmail(),
  body('password').notEmpty(),
  reqValidationResult,
];

export async function create(req: any, res: any): Promise<void> {
  const { body } = req;
  const hashedPassword = hashPassword(body.password);
  const user = {
    userName : body.userName,
    firstName : body.firstName,
    lastName : body.lastName,
    bio: body.bio,
    address : body.address,
    city : body.city,
    country : body.country,
    education : body.education,
    work : body.work,
    about : body.about,
    email : body.email,
    password : hashedPassword,
    role : 'Admin',
  };

  // Find User By Email
  if (await isExistByEmail(user.email)) {
    return res.status(404).json(ValidationError('email', 'This email already registered'));
  }

  // Find User By UserName
  if ( await isExistByUsername(user.userName)) {
    return res.status(404).json(ValidationError('user name', 'This user name already exist'));
  }


  try {
    await User.create(user);
    // @todo add user id
    sendRegisterEmail(user.email, user.firstName, user.id, user.emailVerificationCode);
    res.json(user);
  } catch (e) {
    res.status(500).json(ServerError(e.message, 500));
  }
}
