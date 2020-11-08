import mongoose, {Document, Schema} from "mongoose";

interface IMenuItem extends Document {
    title: string;
    description: string;
    link: string;
    menuId: string;
    parent: string,
}

interface IMenu extends Document {
    title: string;
    description: string;
    items: Object[],
    getFullMenu: Function,
}


const MenuSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    items: {
        type: Array,
        required: false,
    },

}, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}, versionKey: false});

const Menu = mongoose.model<IMenu>('menu', MenuSchema);

export {Menu, IMenu, MenuSchema}