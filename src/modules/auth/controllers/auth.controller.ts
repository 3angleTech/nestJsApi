import { Body, Controller, Get, Inject, Post, Res, UseGuards } from '@nestjs/common';

import { RequestUser, SkipAccessTokenGuard } from '~common/auth';
import { User } from '~modules/users';

import { AuthDto, OAuth2GrantType } from '../dto/auth.dto';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';
import { AUTH_SERVICE, IAuthService } from '../services/auth.interface';
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authService: IAuthService,
  ) {}

  @SkipAccessTokenGuard()
  @UseGuards(RefreshTokenGuard)
  @Post('token')
  public async login(@Res({ passthrough: true }) res, @Body() authDto: AuthDto, @RequestUser() requestUser) {
    if (authDto.grant_type === OAuth2GrantType.Password) {
      const user: User = await this.authService.login(authDto);
      const tokens = await this.authService.getTokens(user.id, user.username);

      res.cookie(ACCESS_TOKEN_COOKIE_NAME, tokens.accessToken, {
        httpOnly: true,
      });
      res.cookie(REFRESH_TOKEN_COOKIE_NAME, tokens.refreshToken, {
        httpOnly: true,
      });

      return tokens;
    } else if (authDto.grant_type === OAuth2GrantType.RefreshToken) {
      const accessToken = await this.authService.getAccessToken(
        requestUser.id,
        requestUser.username,
      );

      res.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
        httpOnly: true,
      });

      return {
        accessToken,
      };
    }
  }

  @SkipAccessTokenGuard()
  @Get('logout')
  public logout(@Res({ passthrough: true }) res) {
    res.clearCookie(ACCESS_TOKEN_COOKIE_NAME);
    res.clearCookie(REFRESH_TOKEN_COOKIE_NAME);

    return {
      message: 'Logged out successfully',
    };
  }
}
