import { Controller, Get, Inject, Param } from '@nestjs/common';
import { IUsersService, USERS_SERVICE } from '~common/users';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly usersService: IUsersService,
  ) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
