import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
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
    const securityConfig = configService.get<SecurityConfiguration>('security')!;
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        RefreshTokenStrategy.extractTokenFromCookies,
      ]),
      secretOrKey: securityConfig.refreshTokenSecret,
      ignoreExpiration: false,
    });
  }

  validate(payload: JwtPayload): IRequestUser {
    return {
      userId: payload.sub,
      username: payload.username,
    };
  }

  private static extractTokenFromCookies(req: Request): string | null {
    const token = req?.cookies?.[REFRESH_TOKEN_COOKIE_NAME] as string | undefined;
    return token || null;
  }
}
