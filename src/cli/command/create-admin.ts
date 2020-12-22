import { IUser, User } from '../../models/User';

const createAdmin = async () => {
  const user: IUser = new User();
  user.userName = 'effinbzz';
  user.firstName = 'Abdullah';
  user.lastName = 'Moawad';
  user.password = 'root';
  user.email = 'effinbzz@gmail.com';
  // @ts-ignore
  const userRow = await (new User).createUser(user);
  if (userRow) {
    console.log('user created');
    console.log(userRow.id);
  } else {
    console.error('error');
    console.log(userRow);
  }
  process.exit();

};

export { createAdmin };