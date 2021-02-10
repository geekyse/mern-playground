import {NotFoundError} from "../../../util/request";
import {BaseValidationType, reqValidationResult} from "../../../types";

export const getByTokenValidator: BaseValidationType = [reqValidationResult];

export async function getByToken(req: any, res: any): Promise<void> {
    const {user} = req;

    if (!user) {
        res.status(404).json(NotFoundError());
        return;
    }
    res.json(user);
}

