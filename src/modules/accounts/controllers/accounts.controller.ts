import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Post, UseInterceptors } from '@nestjs/common';

import { RequestUserId, SkipAccessTokenGuard } from '~common/auth';
import { CreateUserDto, IUsersService, USERS_SERVICE } from '~modules/users';

@Controller('account')
export class AccountsController {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly usersService: IUsersService,
  ) {}

  @SkipAccessTokenGuard()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/me')
  getMyDetails(@RequestUserId() userId: string) {
    return this.usersService.findById(userId);
  }
}
