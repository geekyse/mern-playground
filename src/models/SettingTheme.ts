import mongoose, {Document, Schema} from "mongoose";

interface ISettingTheme extends Document {
    mainMenu: string;
}


const SettingThemeSchema = new Schema({
    mainMenu: {
        type: String,
        required: false,
    },

}, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}, versionKey: false});


const SettingTheme = mongoose.model<ISettingTheme>('setting_theme', SettingThemeSchema);

export {SettingTheme, ISettingTheme, SettingThemeSchema}