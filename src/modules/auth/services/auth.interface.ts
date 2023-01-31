import { User } from '~modules/users';
import { AuthDto } from '../dto/auth.dto';

export interface IAuthService {
  login(authDto: AuthDto): Promise<User>;
  getTokens(userId: string, username: string);
  getAccessToken(userId: string, username: string);
}
export const AUTH_SERVICE = 'AUTH_SERVICE';
