import { UserSession } from '../../../../models/UserSession';
import { BaseValidationType } from '../../../../types/validators';
import { reqValidationResult } from '../../../../types/req-validation-result';

export const deleteValidator: BaseValidationType = [reqValidationResult];

export async function deleteSession(req: any, res: any): Promise<void> {
  await UserSession.deleteOne({ token: req.adminToken });
  res.json({});
}

