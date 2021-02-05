import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { jwtSecret } from '../../../config/env/env.config';
import { IPayload } from '../interface/payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private logger = new Logger('JwtStrategy');
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
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
