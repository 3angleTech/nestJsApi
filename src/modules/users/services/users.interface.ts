import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export interface IUsersService {
  create(createUserDto: CreateUserDto);
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
}
export const USERS_SERVICE = 'USERS_SERVICE';
