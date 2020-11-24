import mongoose from 'mongoose';
import {bool} from "sharp";
const Schema = mongoose.Schema;

// @todo check if fields are not empty
// @todo friends logic as array inside user schema
// @todo user photos as albums
// @todo user posts and comments

const userSchema = new Schema({
    userName:   {type:String,},
    firstName:  {type:String,},
    lastName :  {type:String,required:true},
    bio:        {type:String},
    address:    {type:String},
    city:       {type:String},
    country:    {type:String},
    education:  {type:Array},
    work:       {type:Array},
    email:      {type:String,required: [true, 'Why no Email ?']},
    password:   {type:String,min: [8, 'Too few eggs'],required: [true, 'Why no Password ?']},
    about:      {type:String},
    friends:    {type:Array},
    sessionId:  {type:String},
    isActive:   {type:bool,},
}, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}, versionKey: false});

const User = mongoose.model('User', userSchema);

export {User}