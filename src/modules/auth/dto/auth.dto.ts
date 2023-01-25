/* eslint-disable indent*/
import { IsNotEmpty } from 'class-validator';

export enum OAuth2GrantType {
  RefreshToken = 'refresh_token',
  Password = 'password',
}

export class AuthDto {
  @IsNotEmpty()
  grant_type: OAuth2GrantType;

  username: string;
  password: string;
}
