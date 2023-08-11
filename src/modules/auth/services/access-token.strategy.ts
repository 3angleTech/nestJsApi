import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { IRequestUser } from '~common/auth';

import { ACCESS_TOKEN_COOKIE_NAME } from './auth.service';
import { JwtPayload } from '../interfaces/jwt-payload';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        AccessTokenStrategy.extractTokenFromCookies,
      ]),
      secretOrKey: configService.get<string>('security.accessTokenSecret'),
      ignoreExpiration: false,
    });
  }

  validate(payload: JwtPayload): IRequestUser {
    return {
      userId: payload.sub,
      username: payload.username,
    };
  }

  private static extractTokenFromCookies(req): string | null {
    if (req.cookies && ACCESS_TOKEN_COOKIE_NAME in req.cookies) {
      return req.cookies[ACCESS_TOKEN_COOKIE_NAME];
    }
    return null;
  }
}
