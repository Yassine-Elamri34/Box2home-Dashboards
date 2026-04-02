import { faker } from '@faker-js/faker';
import User from '../models/User';
import { IUser } from '../interfaces/user.interfaces';

async function generateFakeUsers(numUsers) {
       const fakeUsers: any[] = [];
       const usersAlreadyExist: IUser[] = await User.find();

       if (!(await User.findOne({ role: 'admin' })))
              fakeUsers.push({
                     username: faker.internet.userName(),
                     email: 'admin@gmail.com',
                     password: '$2b$10$x/G1UqwqSP8NIlYsYbzbaOI/dd9S08PBwmdJBD9dYp.wPM1YI9to2',
                     role: 'admin'
              });
             
       for (let i = 0; i < numUsers; i++) {
              const fakeUser = {
                     username: faker.internet.userName(),
                     email: faker.internet.email(),
                     password: '$2b$10$x/G1UqwqSP8NIlYsYbzbaOI/dd9S08PBwmdJBD9dYp.wPM1YI9to2',
                     role: 'PO'
              };

              fakeUsers.push(fakeUser);
       }
       usersAlreadyExist?.length < 2 && (await User.insertMany(fakeUsers));
       console.log('Fixtures done...');
}

export default async () => generateFakeUsers(20);
