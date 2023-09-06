import { User } from '~common/users';

import { AuthDto } from '../dto/auth.dto';
import { JwtPayload } from '../interfaces/jwt-payload';

export interface IAuthService {
  login(authDto: AuthDto): Promise<User>;
  getTokens(userId: string, username: string);
  getAccessToken(userId: string, username: string);
  getGenericToken(userId: string, email: string, expiresIn: string): Promise<string>;
  verifyGenericToken(token: string): JwtPayload;
}
export const AUTH_SERVICE = 'AUTH_SERVICE';
