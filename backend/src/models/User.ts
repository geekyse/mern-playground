import mongoose, { Document, Schema } from 'mongoose';
import { UserSession } from './UserSession';
import { generateRandomString, hashPassword } from '../util/string';

interface IUser extends Document {
  userName: string;
  firstName: string;
  lastName: string;
  bio: string;
  address: string,
  city: string,
  country: string,
  education: string,
  work: string,
  about: string,
  email: string;
  password: string;
  role: string;
  format: (User: IUser) => IUser;
  // used to create admin user from cli (create-admin)
  createUser: any;
  // used to session after login
  generateSession: any;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema({
  userName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  bio: { type: String },
  address: { type: String },
  city: { type: String },
  country: { type: String },
  education: { type: String },
  work: { type: String },
  about: { type: String },
  email: { type: String, required: [true, 'Why no Email ?'] },
  password: { type: String, min: [8, 'Too few eggs'], required: [true, 'Why no Password ?'] },
  resetPasswordRequested: { type: Boolean, required: true, default: false },
  role: { type: String, required: true },
  isLocked: { type: Boolean, required: true, default: false },
  lockedUntil: { type: Date, required: false },
  isActive: { type: Boolean, required: true, default: true },
  sessionId: { type: String },
  failedTriesCount: { type: Number },
  lastFailedLoginAt: { type: Date },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, versionKey: false });

UserSchema.methods.unsafeFields = function() {
  return [
    'password',
    'emailVerificationCode',
    'resetPasswordCode',
    'isResetPasswordRequested',
    'updatedAt',
  ];
};

UserSchema.methods.generateSession = async function() {
// create session
  const Session = new UserSession();
  Session.email = this.email;
  Session.token = generateRandomString(20);
  Session.userId = this.id;

  try {
    return await Session.save();
  } catch (error) {
    console.log(error, 'error while creating user session !');
    return null;
  }
};

UserSchema.statics.format = async function(user: any) {
  let userObject = user.toObject();
  let unsafeFields = user.unsafeFields();
  unsafeFields.forEach((key: string | number) => delete userObject[key]);
  return userObject;
};

// user for cli command to create admin
UserSchema.methods.createUser = async function(user: IUser) {
  const hashedPassword = hashPassword(user.password);
  const userData = new User();
  userData.userName = user.userName;
  userData.firstName = user.firstName;
  userData.lastName = user.lastName;
  userData.email = user.email;
  userData.password = hashedPassword;
  userData.role = user.role;
  userData.isActive = true;

  const userExist = await User.findOne({ email: userData.email });
  if (userExist) {
    return userExist;
  }

  try {
    await userData.save();
    return userData;
  } catch (e) {
    throw new Error(e);
  }
};

UserSchema.statics.getActiveUser = async function(id: number) {
  return User.findOne({ id, isActive: true });
};

const User = mongoose.model<IUser>('user', UserSchema);

export { User, IUser, UserSchema };
