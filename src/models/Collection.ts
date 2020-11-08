import mongoose, {Document, Schema} from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

interface ICollection extends Document {
    getChildren(): any;

    title: string;
    slug: string;
    description: string;
    logo: string;
    type: string;
    match: string;
    conditions: any;
    products: string[];
    parent: string;
    showOnFilter: boolean;
    langs: Object;
}


const CollectionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {type: String, slug: "title", unique: true, slugPaddingSize: 4, permanent: true},
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

}, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}, versionKey: false});

CollectionSchema.methods.unsafeFields = function () {
    return [];
};

CollectionSchema.methods.getChildren = async function () {
    // return Collection.find({parent: this.id});
    // check if current collection has parent
    let collections = [];
    if (this.parent) {
        let parent = await Collection.findOne({_id: this.parent});
        if (parent.parent) {
            let topParent = await Collection.findOne({_id: parent.parent});
            collections.push(topParent);
        }
        collections.push(parent);

    }
    let current = await Collection.findOne({_id: this._id});
    collections.push(current);
    let children = await Collection.find({$or: [{"parent": this.id}, {"id": this.id}]});
    collections.push(...children);

    return collections;


};

CollectionSchema.statics.format = async function (user) {
    // @ts-ignore
    let userObject = user.toObject();
    // @ts-ignore
    let unsafeFields = user.unsafeFields();
    unsafeFields.forEach(key => delete userObject[key]);

    return userObject;
};

const Collection = mongoose.model<ICollection>('collection', CollectionSchema);

export {Collection, ICollection, CollectionSchema}