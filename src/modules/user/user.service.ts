import { Injectable, Logger } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');

  constructor(private userRepository: UserRepository) {}

  // fetch users
  async fetchUsers(): Promise<User[]> {
    return this.userRepository.fetchUsers();
  }

  // get single user by id
  async getUser(id: number): Promise<User> {
    return this.userRepository.getUser(id);
  }
}
