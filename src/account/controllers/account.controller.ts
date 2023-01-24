import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { RequestUserId } from '../../commons/decorators/request-user-id.decorator';
import { SkipAccessTokenGuard } from '../../commons/decorators/skip-access-token-guard.decorator';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UsersService } from '../../users/services/users.service';

@Controller('account')
export class AccountController {
  constructor(private readonly usersService: UsersService) {}

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
