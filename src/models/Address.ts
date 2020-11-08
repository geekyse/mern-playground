import mongoose, {Document, Schema} from "mongoose";


interface IAddress extends Document {
    country: string;
    addressLine1: string;
    addressLine2: string;
    landmark: string;
    customerId: string;
}


const AddressSchema = new Schema({
    country: {
        type: String,
        required: true,
    },
    addressLine1: {
        type: String,
        required: true,
    },
    addressLine2: {
        type: String,
        required: false,
    },
    landmark: {
        type: String,
        required: false,
    },
    customerId: {
        type: String,
        required: true,
    },

}, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}, versionKey: false});


const Address = mongoose.model<IAddress>('customer_address', AddressSchema);

export {Address, IAddress, AddressSchema}