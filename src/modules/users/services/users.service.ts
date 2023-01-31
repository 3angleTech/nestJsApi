import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { IUsersService } from './users.interface';

const USERNAME_ALREADY_EXISTS_ERROR_MESSAGE =
  'An user account with the same username already exists';
const EMAIL_ALREADY_EXISTS_ERROR_MESSAGE =
  'An user account with the same email already exists';

@Injectable()
export class UsersService implements IUsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.findByUsername(createUserDto.username)) {
      this.logger.warn(USERNAME_ALREADY_EXISTS_ERROR_MESSAGE);
      throw new BadRequestException(USERNAME_ALREADY_EXISTS_ERROR_MESSAGE);
    }
    if (await this.findByEmail(createUserDto.email)) {
      this.logger.warn(EMAIL_ALREADY_EXISTS_ERROR_MESSAGE);
      throw new BadRequestException(EMAIL_ALREADY_EXISTS_ERROR_MESSAGE);
    }

    const createUser: User = this.userRepository.create(createUserDto);
    const user: User = await this.userRepository.save(createUser);

    return {
      message: 'User created successfully.',
      user: user,
    };
  }

  findById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({
      id: id,
    });
  }

  findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({
      username: username,
    });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({
      email: email,
    });
  }
}
