import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Algorithm } from 'jsonwebtoken';
import { verify } from '../../commons/crypto/crypto';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/services/users.service';
import { AuthDto } from '../dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async login(authDto: AuthDto) {
    const user = await this.usersService.findByUsername(authDto.username);
    await this.validateUserCredentials(user, authDto);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.getTokens(user!.id, user!.username);
  }

  private async validateUserCredentials(user: User | null, authDto: AuthDto) {
    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await verify(authDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
  }

  private async getTokens(userId: string, username: string) {
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
    return this.jwtService.signAsync(
      {
        sub: userId,
        username: username,
      },
      {
        secret: this.configService.get<string>('security.accessTokenSecret'),
        expiresIn: this.configService.get<string>(
          'security.accessTokenExpirationTime',
        ),
        issuer: this.configService.get<string>('security.tokensIssuer'),
        algorithm: this.configService.get<Algorithm | undefined>(
          'security.tokensAlgorithm',
        ),
      },
    );
  }

  private async getRefreshToken(userId: string, username: string) {
    return this.jwtService.signAsync(
      {
        sub: userId,
        username: username,
      },
      {
        secret: this.configService.get<string>('security.refreshTokenSecret'),
        expiresIn: this.configService.get<string>(
          'security.refreshTokenExpirationTime',
        ),
        issuer: this.configService.get<string>('security.tokensIssuer'),
        algorithm: this.configService.get<Algorithm | undefined>(
          'security.tokensAlgorithm',
        ),
      },
    );
  }
}
