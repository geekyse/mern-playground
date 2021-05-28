import { User } from '../../../models/User';
import { body } from 'express-validator';
import { BaseValidationType } from '../../../types/validators';
import { reqValidationResult } from '../../../types/req-validation-result';
import { ServerError, ValidationError } from '../../../util/request';
import { hashPassword } from '../../../util/string';
import { isExistByEmail, isExistByUsername } from '../../../models/UserHelpers';

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
  const user = new User();

  user.userName = body.userName;
  user.firstName = body.firstName;
  user.lastName = body.lastName;
  user.bio = body.bio;
  user.address = body.address;
  user.city = body.city;
  user.country = body.country;
  user.education = body.education;
  user.work = body.work;
  user.about = body.about;
  user.email = body.email;
  user.password = hashedPassword;
  user.role = 'Admin';
  user.isActive = true;

  // Find User By Email
  if (await isExistByEmail(user.email)) {
    return res.status(404).json(ValidationError('email', 'This email already registered'));
  }

  // Find User By UserName
  if (await isExistByUsername(user.userName)) {
    return res.status(404).json(ValidationError('user name', 'This user name already exist'));
  }

  try {
    await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json(ServerError(e.message, 500));
  }
}
