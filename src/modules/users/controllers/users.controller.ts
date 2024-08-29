import { Controller, Get, Inject, Param } from '@nestjs/common';
import { IUsersService, UsersService } from '~common/users';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
