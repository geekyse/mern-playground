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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionSchema = exports.Collection = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_slug_updater_1 = __importDefault(require("mongoose-slug-updater"));
mongoose_1.default.plugin(mongoose_slug_updater_1.default);
const CollectionSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: { type: String, slug: "title", unique: true, slugPaddingSize: 4, permanent: true },
    description: {
        type: String,
        required: false,
    },
    logo: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: true,
    },
    match: {
        type: String,
        required: true,
    },
    products: {
        type: Array,
        required: false,
    },
    conditions: {
        type: Array,
        required: false,
    },
    parent: {
        type: String,
        required: false,
    },
    showOnFilter: {
        type: Boolean,
        required: true,
        default: true,
    },
    langs: {
        type: Object,
        required: false,
        index: true,
    }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, versionKey: false });
exports.CollectionSchema = CollectionSchema;
CollectionSchema.methods.unsafeFields = function () {
    return [];
};
CollectionSchema.methods.getChildren = function () {
    return __awaiter(this, void 0, void 0, function* () {
        // return Collection.find({parent: this.id});
        // check if current collection has parent
        let collections = [];
        if (this.parent) {
            let parent = yield Collection.findOne({ _id: this.parent });
            if (parent.parent) {
                let topParent = yield Collection.findOne({ _id: parent.parent });
                collections.push(topParent);
            }
            collections.push(parent);
        }
        let current = yield Collection.findOne({ _id: this._id });
        collections.push(current);
        let children = yield Collection.find({ $or: [{ "parent": this.id }, { "id": this.id }] });
        collections.push(...children);
        return collections;
    });
};
CollectionSchema.statics.format = function (user) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        let userObject = user.toObject();
        // @ts-ignore
        let unsafeFields = user.unsafeFields();
        unsafeFields.forEach(key => delete userObject[key]);
        return userObject;
    });
};
const Collection = mongoose_1.default.model('collection', CollectionSchema);
exports.Collection = Collection;
