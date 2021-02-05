import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserDto } from './dto/new-user.dto';
import { User } from '../user/entity/user.entity';
import { CredentialsDto } from './dto/credentials.dto';
import { IPayload } from './interface/payload.interface';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async registerUser(@Body() newUserDto: NewUserDto): Promise<User> {
    return this.authService.registerUser(newUserDto);
  }

  @Post('login')
  async login(@Body() credentialsDto: CredentialsDto): Promise<any> {
    return this.authService.validateUser(credentialsDto);
  }

  @Post('refresh')
  async refresh(@Body() payload: IPayload): Promise<{ token: string }> {
    return this.authService.refresh(payload);
  }
}
