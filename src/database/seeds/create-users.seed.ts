import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { UserStatusEnum } from '../../common/constants';
import { HashHelper } from '../../utils';
import { UserEntity } from '../../modules/identity/entities/user.entity';

const users = [
  {
    fullName: 'Tolkien',
    password: '@Publicpass',
    email: 'info@lotr.com',
    username: 'lotr',
    bio: '-',
    website: '[grasp.at](https://www.grasp.at/)',
    youtube: '-',
    isSuperUser: true,
    status: UserStatusEnum.Active,
  },
];

export default class CreateUsersSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // Mapping all permissions to permission entities
    //Creating users
    const userEntities = await Promise.all(
      users.map(async (u) => {
        const password = await HashHelper.encrypt(u.password);
        const user = new UserEntity({ ...u, password });
        return user;
      }),
    );
    await connection.manager.save(userEntities);
  }
}
