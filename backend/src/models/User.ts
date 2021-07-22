import { mysqlConnection } from '../server/db';
import { DataTypes } from 'sequelize';
const sequelize = mysqlConnection();


export const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  country: {
    type: DataTypes.STRING,
  },
  education: {
    type: DataTypes.STRING,
  },
  work: {
    type: DataTypes.STRING,
  },
  about: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.STRING,
  }
}, {
  // Other model options go here
});


// interface IUser extends Document {
//   userName: string;
//   firstName: string;
//   lastName: string;
//   bio: string;
//   address: string,
//   city: string,
//   country: string,
//   education: string,
//   work: string,
//   about: string,
//   email: string;
//   password: string;
//   role: string;
//   format: (User: IUser) => IUser;
//   // used to create admin user from cli (create-admin)
//   createUser: any;
//   // used to session after login
//   generateSession: any;
//   isActive: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const UserSchema = new Schema({
//   userName: { type: String, required: true },
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   bio: { type: String },
//   address: { type: String },
//   city: { type: String },
//   country: { type: String },
//   education: { type: String },
//   work: { type: String },
//   about: { type: String },
//   email: { type: String, required: [true, 'Why no Email ?'] },
//   password: { type: String, min: [8, 'Too few eggs'], required: [true, 'Why no Password ?'] },
//   resetPasswordRequested: { type: Boolean, required: true, default: false },
//   role: { type: String, required: true },
//   isLocked: { type: Boolean, required: true, default: false },
//   lockedUntil: { type: Date, required: false },
//   isActive: { type: Boolean, required: true, default: true },
//   sessionId: { type: String },
//   failedTriesCount: { type: Number },
//   lastFailedLoginAt: { type: Date },
// }, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, versionKey: false });
//
// UserSchema.methods.unsafeFields = function() {
//   return [
//     'password',
//     'emailVerificationCode',
//     'resetPasswordCode',
//     'isResetPasswordRequested',
//     'updatedAt',
//   ];
// };
//
// UserSchema.methods.generateSession = async function() {
//
//   const session = new UserSession();
//   // @ts-ignore
//   session.email = this.email;
//   session.token = generateRandomString(20);
//   session.userId = this.id;
//
//   // save session to mongodb
//   try {
//     await session.save();
//     console.info(session);
//   } catch (e) {
//     console.log(e, 'error while saving session to mongodb!');
//     return null;
//   }
//
//   // save session to redis
//   try {
//     const redisSessionCacheKey: string = 'admin_session_key';
//     await redisConnection().set(redisSessionCacheKey + this.id, session, 'EX', 1);
//
//     return session;
//   } catch (error) {
//     console.log(error, 'error while saving session to redis!');
//     return null;
//   }
// };
//
// UserSchema.statics.format = async function(user: any) {
//   let userObject = user.toObject();
//   let unsafeFields = user.unsafeFields();
//   unsafeFields.forEach((key: string | number) => delete userObject[key]);
//   return userObject;
// };
//
// // user for cli command to create admin
// UserSchema.methods.createUser = async function(user: IUser) {
//   const hashedPassword = hashPassword(user.password);
//   const userData = new User();
//   userData.userName = user.userName;
//   userData.firstName = user.firstName;
//   userData.lastName = user.lastName;
//   userData.email = user.email;
//   userData.password = hashedPassword;
//   userData.role = user.role;
//   userData.isActive = true;
//
//   const userExist = await User.findOne({ email: userData.email });
//   if (userExist) {
//     return userExist;
//   }
//
//   try {
//     await userData.save();
//     return userData;
//   } catch (e) {
//     throw new Error(e);
//   }
// };
//
// UserSchema.statics.getActiveUser = async function(id: number) {
//   return User.findOne({ id, isActive: true });
// };
//
// const User = mongoose.model<IUser>('user', UserSchema);
//
