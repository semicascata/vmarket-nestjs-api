import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './entity/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository');

  // fetch users

  // get user by id

  // find user by id in AuthModule
}
