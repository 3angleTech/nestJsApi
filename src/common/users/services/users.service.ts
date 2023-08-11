import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { IUsersService } from './users.interface';

@Injectable()
export class UsersService implements IUsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async create(createUserDto: CreateUserDto) {
    if (await this.findByUsername(createUserDto.username)) {
      this.logger.warn('SERVER_ERROR.USER.USERNAME_ALREADY_EXISTS');
      throw new BadRequestException('SERVER_ERROR.USER.USERNAME_ALREADY_EXISTS');
    }
    if (await this.findByEmail(createUserDto.email)) {
      this.logger.warn('SERVER_ERROR.USER.EMAIL_ALREADY_EXISTS');
      throw new BadRequestException('SERVER_ERROR.USER.EMAIL_ALREADY_EXISTS');
    }

    createUserDto.email = createUserDto.email.toLowerCase();
    const createUser: User = this.userRepository.create(createUserDto);
    return this.userRepository.save(createUser);
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
      email: email.toLowerCase(),
    });
  }

  async update(userId: string, user: DeepPartial<User>): Promise<User> {
    if (user.email) {
      user.email = user.email.toLowerCase();
    }
    await this.userRepository.update(userId, user);
    return await this.findById(userId) as User;
  }

}
