import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './entity/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository');

  // fetch users
  async fetchUsers(): Promise<User[]> {
    const query = this.createQueryBuilder();

    try {
      const users = await query.getMany();
      this.logger.verbose('fetching users');
      return users;
    } catch (err) {
      this.logger.error(`failed to fetch users - ${err.message}`);
      throw new InternalServerErrorException(
        `failed to fetch users - ${err.message}`,
      );
    }
  }

  // get user by id
  async getUser(id: number): Promise<User> {
    const query = this.createQueryBuilder();

    try {
      const user = await query.where({ id: id }).getOne();
      this.logger.verbose(`retrieving user "${user.username}"`);
      return user;
    } catch (err) {
      this.logger.error(`failed to get user by id ${id} - ${err.message}`);
      throw new InternalServerErrorException(
        `failed to get user by id ${id} - ${err.message}`,
      );
    }
  }

  // find user by id in AuthModule
  async getUserByUsername(username: string): Promise<User> {
    const query = this.createQueryBuilder();

    try {
      const user = await query.where({ username: username }).getOne();

      delete user.password;
      return user;
    } catch (err) {
      this.logger.error(
        `failed to get user by username "${username}" - ${err.message}`,
      );
      throw new InternalServerErrorException(
        `failed to get user by username "${username}" - ${err.message}`,
      );
    }
  }
}
