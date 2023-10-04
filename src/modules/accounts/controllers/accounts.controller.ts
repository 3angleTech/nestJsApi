import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

import { RequestUserId, SkipAccessTokenGuard } from '~common/auth';
import { CreateUserDto, IUsersService, USERS_SERVICE } from '~common/users';

import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ACCOUNTS_SERVICE, IAccountsService } from '../services/accounts.interface';
import { ResetPasswordDto } from '../dto/reset-password.dto';

@Controller('account')
export class AccountsController {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly usersService: IUsersService,
    @Inject(ACCOUNTS_SERVICE)
    private readonly accountsService: IAccountsService,
  ) {}

  @SkipAccessTokenGuard()
  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/me')
  async getMyDetails(@RequestUserId() userId: string) {
    return this.usersService.findById(userId);
  }

  @SkipAccessTokenGuard()
  @Post('/forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    dto.email = dto.email.toLowerCase();
    await this.accountsService.forgotPassword(dto);

    return {
      message: 'SERVER_MESSAGE.PASSWORD_RECOVERY_MAIL_SENT',
    };
  }

  @SkipAccessTokenGuard()
  @Post('/reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.accountsService.resetPassword(dto);

    return {
      message: 'SERVER_MESSAGE.PASSWORD_RESET_SUCCESS',
    };
  }

}
