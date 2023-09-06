import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { IRequestUser } from '~common/auth';
import { SecurityConfiguration } from '~config/security.config';

import { REFRESH_TOKEN_COOKIE_NAME } from './auth.service';
import { JwtPayload } from '../interfaces/jwt-payload';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        RefreshTokenStrategy.extractTokenFromCookies,
      ]),
      secretOrKey: configService.get<SecurityConfiguration>('security')?.refreshTokenSecret,
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
    if (req.cookies && REFRESH_TOKEN_COOKIE_NAME in req.cookies) {
      return req.cookies[REFRESH_TOKEN_COOKIE_NAME];
    }
    return null;
  }
}
