import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { verify } from '~common/crypto';
import { UsersService } from '~common/users';
import { User } from '~entities/index';
import { SecurityConfiguration } from '~config/security.config';

import { AuthDto } from '../dto/auth.dto';
import { JwtPayload } from '../interfaces/jwt-payload';

export interface IAuthService {
  login(authDto: AuthDto): Promise<User>;
  getTokens(userId: string, username: string);
  getAccessToken(userId: string, username: string);
  getGenericToken(userId: string, email: string, expiresIn: string): Promise<string>;
  verifyGenericToken(token: string): JwtPayload;
}

export const ACCESS_TOKEN_COOKIE_NAME: string = 'accessToken';
export const REFRESH_TOKEN_COOKIE_NAME: string = 'refreshToken';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async login(authDto: AuthDto): Promise<User> {
    if (!authDto.username) {
      throw new UnauthorizedException();
    }
    const user = await this.usersService.findByUsername(authDto.username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await verify(authDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    return user;
  }

  public async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.getAccessToken(userId, username),
      this.getRefreshToken(userId, username),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  public async getAccessToken(userId: string, username: string) {
    const securityConfiguration = this.configService.get('security') as SecurityConfiguration;
    return this.jwtService.signAsync(
      {
        sub: userId,
        username: username,
      },
      {
        secret: securityConfiguration.accessTokenSecret,
        expiresIn: securityConfiguration.accessTokenExpirationTime,
        issuer: securityConfiguration.tokensIssuer,
        algorithm: securityConfiguration.tokensAlgorithm,
      },
    );
  }

  public async getGenericToken(userId: string, email: string, expiresIn: string): Promise<string> {
    const securityConfiguration = this.configService.get('security') as SecurityConfiguration;
    return this.jwtService.signAsync(
      {
        sub: userId,
        email: email,
      },
      {
        secret: securityConfiguration.genericTokenSecret,
        expiresIn: expiresIn,
        issuer: securityConfiguration.tokensIssuer,
        algorithm: securityConfiguration.tokensAlgorithm,
      },
    );
  }

  public verifyGenericToken(token: string): JwtPayload {
    const securityConfiguration = this.configService.get('security') as SecurityConfiguration;
    return this.jwtService.verify(token, {
      secret: securityConfiguration.genericTokenSecret,
    });
  }

  private async getRefreshToken(userId: string, username: string) {
    const securityConfiguration = this.configService.get('security') as SecurityConfiguration;
    return this.jwtService.signAsync(
      {
        sub: userId,
        username: username,
      },
      {
        secret: securityConfiguration.refreshTokenSecret,
        expiresIn: securityConfiguration.refreshTokenExpirationTime,
        issuer: securityConfiguration.tokensIssuer,
        algorithm: securityConfiguration.tokensAlgorithm,
      },
    );
  }
}
