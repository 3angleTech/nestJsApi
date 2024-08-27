import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

import { RequestUserId, SkipAccessTokenGuard } from '~common/auth';
import { CreateUserDto, IUsersService, User, UsersService } from '~common/users';

import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { AccountsService } from '../services/accounts.service';

@Controller('account')
export class AccountsController {
  constructor(
    private readonly usersService: UsersService,
    private readonly accountsService: AccountsService,
  ) {}

  @SkipAccessTokenGuard()
  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/me')
  async getMyDetails(@RequestUserId() userId: string): Promise<User> {
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
