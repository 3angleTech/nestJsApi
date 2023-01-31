import { ClassSerializerInterceptor, Controller, Get, Inject, Param, UseInterceptors } from '@nestjs/common';
import { IUsersService, USERS_SERVICE } from '../services/users.interface';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly usersService: IUsersService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
