import mongoose from "mongoose";
import {BaseCartSchema, ICart} from "./Cart";

const OrderSchema = BaseCartSchema;

const Order = mongoose.model<ICart>('order', OrderSchema);

export {Order}