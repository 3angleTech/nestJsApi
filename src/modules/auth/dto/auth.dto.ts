import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export enum OAuth2GrantType {
  RefreshToken = 'refresh_token',
  Password = 'password',
}

@Expose()
export class AuthDto {
  @ApiProperty({ example: 'password', description: 'OAuth2 grant type' })
  @IsNotEmpty()
  grant_type: OAuth2GrantType;

  @ApiProperty({ example: 'john_doe', description: 'Username' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'password123', description: 'Password' })
  @IsNotEmpty()
  password: string;
}
