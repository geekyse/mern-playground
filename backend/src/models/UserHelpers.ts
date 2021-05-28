import { User } from './User';

export const isExistByEmail = async (email: any) => {
  const userExist = await User.countDocuments({ email: email }, err => err);
  return userExist > 0;
};

export const isExistByUsername = async (userName: any) => {
  const userExist = await User.countDocuments({ userName: userName }, err => err);
  return userExist > 0;
};

export const getUserById = async (id: any) => await User.findById(id);
