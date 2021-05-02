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
  userRow.about = body.about;
  userRow.email = body.email;
  userRow.password = hashedPassword;
  userRow.role = 'Admin';
  userRow.isActive = true;

  // Find User By Email
  if (await isExistByEmail(userRow.email)) {
    return res.status(404).json(ValidationError('email', 'This email already registered'));
  }

  // Find User By UserName
  if (await isExistByUsername(userRow.userName)) {
    return res.status(404).json(ValidationError('user name', 'This user name already exist'));
  }

  try {
    await userRow.save();
    res.json(userRow);
  } catch (e) {
    res.status(500).json(ServerError(e.message, 500));
  }
}
