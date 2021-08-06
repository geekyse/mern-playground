import { User } from '../../models/User';

const createAdmin = async () => {

  const user = {
    userName: 'username',
    firstName: 'test',
    lastName: 'test',
    email: 'test@test.com',
    password: '123123123',
    role: 'admin',
  };

  const userRow = await  User.create(user);

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
