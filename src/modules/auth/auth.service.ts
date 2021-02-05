import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Connection } from 'typeorm';
import { UserRepository } from '../user/user.repository';
import { CredentialsDto } from './dto/credentials.dto';
import { IToken } from './interface/token.interface';
import { AuthProvider } from '../../common/providers/auth.provider';
import { NewUserDto } from './dto/new-user.dto';
import { User } from '../user/entity/user.entity';
import { IPayload } from './interface/payload.interface';
import * as jwt from 'jsonwebtoken';
import { jwtRefresh, jwtExpires } from '../../config/env/env.config';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  private tokenList = {};
  private userRepository: UserRepository;

  constructor(
    private connection: Connection,
    private jwtService: JwtService,
    private authProvider: AuthProvider,
  ) {
    this.userRepository = this.connection.getCustomRepository(UserRepository);
  }

  // jwt validation
  async validateUser(credentialsDto: CredentialsDto): Promise<any> {
    const user = await this.userRepository.findOne({
      username: credentialsDto.username,
    });

    // validate password
    const isMatch = await this.authProvider.hashAndMatch(
      user.password,
      credentialsDto.password,
    );

    if (user && isMatch) {
      const tokens: IToken = await this.authProvider.generateTokens(user);
      const data = {
        user: user.username,
      };

      // token store
      this.tokenList[tokens.refreshToken] = data;
      return tokens;
    }

    return null;
  }

  // register user
  async registerUser(newUserDto: NewUserDto): Promise<User> {
    const { username, email, password, confirmPassword, role } = newUserDto;
    const newUser = new User();

    // check password
    if (password !== confirmPassword) {
      this.logger.error('passwords dont match');
      throw new ConflictException('passwords dont match');
    }

    newUser.username = username;
    newUser.email = email;
    newUser.password = password;
    role ? (newUser.role = role) : null;

    try {
      await this.userRepository.save(newUser);
      this.logger.verbose(`user "${username}" registered`);
      delete newUser.password;
      return newUser;
    } catch (err) {
      if (err.code === '23505') {
        this.logger.error(`username or email already exists - ${err.message}`);
        throw new ConflictException(
          `username or email already exists - ${err.message}`,
        );
      }
      this.logger.error(`failed to register user - ${err.message}`);
      throw new InternalServerErrorException(
        `failed to register user - ${err.message}`,
      );
    }
  }

  // refresh token
  async refresh(payload: IPayload): Promise<{ token: string }> {
    const decodedToken = jwt.verify(payload['refreshToken'], jwtRefresh);
    console.log(decodedToken);

    // get user from payload
    const user: User = await this.userRepository.findOne({
      id: decodedToken['id'],
    });

    try {
      const refreshToken: string = payload['refreshToken'];

      const isMatch = refreshToken in this.tokenList;

      if (isMatch) {
        const payload: IPayload = { id: user.id };
        const token = this.jwtService.sign(payload, {
          expiresIn: jwtExpires,
        });

        // token store update
        this.tokenList[refreshToken].token = token;
        this.logger.verbose(`token refreshed for user "${user.username}"`);
        return { token };
      } else {
        this.logger.error('invalid credentials, token invalid');
        throw new UnauthorizedException('invalid credentials, token invalid');
      }
    } catch (err) {
      this.logger.error(`invalid or expired token - ${err.message}`);
      throw new UnauthorizedException(
        `invalid or expired token - ${err.message}`,
      );
    }
  }

  // jwt validation
  async jwtValidation(payload: IPayload): Promise<User> {
    return await this.userRepository.findOne(payload.id);
  }
}
