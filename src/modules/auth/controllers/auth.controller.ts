import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RequestUser } from '../../../common/auth/request-user.decorator';
import { SkipAccessTokenGuard } from '../../../common/auth/skip-access-token-guard.decorator';
import { User } from '../../users/entities/user.entity';
import { AuthDto, OAuth2GrantType } from '../dto/auth.dto';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAccessTokenGuard()
  @UseGuards(RefreshTokenGuard)
  @Post('token')
  async login(@Body() authDto: AuthDto, @RequestUser() requestUser) {
    if (authDto.grant_type === OAuth2GrantType.Password) {
      const user: User = await this.authService.login(authDto);
      return this.authService.getTokens(user.id, user.username);
    } else if (authDto.grant_type === OAuth2GrantType.RefreshToken) {
      const accessToken = await this.authService.getAccessToken(
        requestUser.id,
        requestUser.username,
      );
      return {
        accessToken,
      };
    }
  }
}
