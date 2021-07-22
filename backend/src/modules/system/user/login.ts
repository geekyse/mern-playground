import { BaseValidationType } from '../../../types/validators';
import { body } from 'express-validator';
import { reqValidationResult } from '../../../types/req-validation-result';
import { User } from '../../../models/User';
import { ServerError, ValidationError } from '../../../util/request';
import { comparePasswords, format } from '../../../util/string';

export const loginValidator: BaseValidationType = [
  body('email').notEmpty().isEmail().normalizeEmail().isString(),
  body('password').notEmpty().isString(),
  reqValidationResult,
];

export async function login(req: any, res: any): Promise<void> {
  const { body } = req;

  let user = await User.findOne({ email: body.email });
  if (!user || !comparePasswords(body.password, user.password)) {
    res.status(400).json(ValidationError('password', 'Wrong email or password'));
    return;
  }
  console.log("----------------")
  try {
    const session = await user.generateSession();
    res.json({ user: format(user), token: session.token });

  } catch (e) {
    console.log(e);
    res.status(500).json(ServerError(e.message));
  }

}
