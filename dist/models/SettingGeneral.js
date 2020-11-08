"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingGeneralSchema = exports.SettingGeneral = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const SettingGeneralSchema = new mongoose_1.Schema({
    storeName: {
        type: String,
        required: false,
    },
    contactEmail: {
        type: String,
        required: false,
    },
    address: {
        phone: {
            type: String,
            required: false,
        },
        addressLine1: {
            type: String,
            required: false,
        },
        addressLine2: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: false,
        },
        country: {
            type: String,
            required: false,
        },
        state: {
            type: String,
            required: false,
        },
        zipcode: {
            type: String,
            required: false,
        },
    },
    formats: {
        timezone: {
            type: String,
            required: false,
        },
        unitSystem: {
            type: String,
            required: false,
        },
        defaultWeightUnit: {
            type: String,
            required: false,
        },
    },
    currency: {
        defaultCurrency: {
            type: String,
            required: false,
        },
        otherCurrencies: Array,
    }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, versionKey: false });
exports.SettingGeneralSchema = SettingGeneralSchema;
const SettingGeneral = mongoose_1.default.model('setting_general', SettingGeneralSchema);
exports.SettingGeneral = SettingGeneral;
