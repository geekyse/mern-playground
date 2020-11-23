import { body } from 'express-validator';

import {User} from '../models/user'

 const createUserValidator = [
     body('name')
         .isString()
         .isLength({min: 1, max: 255}),
     body('firstName')
         .isString()
         .isLength({min: 1, max: 255}),
     body('lastName')
         .isString()
         .isLength({min: 1, max: 255}),
     body('email')
         .isEmail()
         .isString()
         .notEmpty(),
     body('email')
         .notEmpty()
         .isLength({min: 8, max: 255}),
     ];





export {createUserValidator}