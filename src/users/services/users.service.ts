import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

const USER_ALREADY_EXISTS_ERROR_MESSAGE =
  'An user account with the same username or email already exists';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const createUser: User = this.userRepository.create(createUserDto);
      const user: User = await this.userRepository.save(createUser);

      return {
        message: 'User created successfully.',
        user: user,
      };
    } catch (e) {
      if (e instanceof QueryFailedError && e.driverError.code === '23505') {
        this.logger.warn(e.driverError.detail);
        throw new ConflictException(USER_ALREADY_EXISTS_ERROR_MESSAGE);
      }

      throw e;
    }
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({
      id: id,
    });
  }

  findByUsername(username: string) {
    return this.userRepository.findOneBy({
      username: username,
    });
  }
}
