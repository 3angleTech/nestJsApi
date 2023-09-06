import { DeepPartial } from 'typeorm';

import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export interface IUsersService {
  create(createUserDto: CreateUserDto): Promise<User>;
  findById(id: string): Promise<User>;
  findByUsername(username: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  update(userId: string, user: DeepPartial<User>): Promise<User>;
}
export const USERS_SERVICE = 'USERS_SERVICE';
