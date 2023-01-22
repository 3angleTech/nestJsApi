import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUserId } from '../../commons/decorators/current-user-id.decorator';
import { Public } from '../../commons/decorators/public.decorator';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UsersService } from '../../users/services/users.service';

@Controller('account')
export class AccountController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/me')
  getMyDetails(@CurrentUserId() userId: string) {
    return this.usersService.findOne(userId);
  }
}
