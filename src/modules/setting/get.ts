import {BaseValidationType, reqValidationResult} from '../../types';
import {SettingTheme} from "../../models/SettingTheme";
import {SettingGeneral} from "../../models/SettingGeneral";
import {Menu} from "../../models/Menu";

export const getValidator: BaseValidationType = [
    reqValidationResult];

export async function get(req: any, res: any): Promise<void> {

    const settingTheme = await SettingTheme.findOne();

    const generalSetting = await SettingGeneral.findOne();
    // @ts-ignore
    const menuItems = await Menu.findOne({_id: settingTheme.mainMenu});

    const setting = {
        'general': generalSetting ? generalSetting.toObject() : null,
        'theme': {
            'mainMenu': menuItems,
        }
    };

    res.json(setting);


}

