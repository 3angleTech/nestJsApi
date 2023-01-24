import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RequestUser } from '../../commons/decorators/request-user.decorator';
import { SkipAccessTokenGuard } from '../../commons/decorators/skip-access-token-guard.decorator';
import { AuthDto } from '../dto/auth.dto';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAccessTokenGuard()
  @Post('login')
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }

  @SkipAccessTokenGuard()
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(@RequestUser() user) {
    const accessToken = await this.authService.getAccessToken(
      user.id,
      user.username,
    );
    return {
      accessToken,
    };
  }
}
