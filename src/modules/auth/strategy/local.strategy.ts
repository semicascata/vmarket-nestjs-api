import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from '../../user/entity/user.entity';
import { CredentialsDto } from '../dto/credentials.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger('LocalStrategy');

  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  // validation (must be called as "validate")
  async validate(username: string, password: string): Promise<User> {
    const credentialsDto: CredentialsDto = { username, password };

    try {
      const user = await this.authService.validateUser(credentialsDto);
      if (!user) {
        throw new UnauthorizedException(
          `user "${username}" not authorized or user not found`,
        );
      }
      return user;
    } catch (err) {
      this.logger.error(`invalid credentials - ${err.message}`);
      throw new InternalServerErrorException(
        `invalid credentials - ${err.message}`,
      );
    }
  }
}
