import { Logger, UnauthorizedException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { jwtRefresh } from '../../../config/env/env.config';
import { IPayload } from '../interface/payload.interface';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  private logger = new Logger('RefreshStrategy');

  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: jwtRefresh,
    });
  }

  // validation
  async validate(payload: IPayload, done: Function): Promise<any> {
    const user = await this.authService.jwtValidation(payload);

    if (!user) {
      this.logger.error('invalid credentials');
      return done(new UnauthorizedException('invalid credentials'), false);
    }

    done(null, user);
  }
}
