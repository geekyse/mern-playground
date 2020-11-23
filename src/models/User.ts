import mongoose from 'mongoose';
import {bool} from "sharp";
const Schema = mongoose.Schema;

// @todo check if fields are not empty

const userSchema = new Schema({
    name:       {type:String,},
    firstName:  {type:String,},
    lastName :  {type:String,required:true},
    email:      {type:String,required: [true, 'Why no Email ?']},
    password:   {type:String,min: [8, 'Too few eggs'],required: [true, 'Why no Password ?']},
    isActive:   {type:bool,},
}, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}, versionKey: false});

const User = mongoose.model('User', userSchema);

export {User}