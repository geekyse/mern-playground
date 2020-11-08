"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.getValidator = void 0;
const types_1 = require("../../types");
const SettingTheme_1 = require("../../models/SettingTheme");
const SettingGeneral_1 = require("../../models/SettingGeneral");
const Menu_1 = require("../../models/Menu");
exports.getValidator = [
    types_1.reqValidationResult
];
function get(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const settingTheme = yield SettingTheme_1.SettingTheme.findOne();
        const generalSetting = yield SettingGeneral_1.SettingGeneral.findOne();
        // @ts-ignore
        const menuItems = yield Menu_1.Menu.findOne({ _id: settingTheme.mainMenu });
        const setting = {
            'general': generalSetting ? generalSetting.toObject() : null,
            'theme': {
                'mainMenu': menuItems,
            }
        };
        res.json(setting);
    });
}
exports.get = get;
