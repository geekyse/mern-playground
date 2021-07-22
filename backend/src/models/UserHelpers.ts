import { User } from './User';

export const isExistByEmail = async (email: any) => {
  return await User.count({ where: { 'email': email } })
};

export const isExistByUsername = async (userName: any) => {
  return await User.count({ where: { 'userName': userName } })
};

export const getUserById = async (id: any) => await User.findById(id);
