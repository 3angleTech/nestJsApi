import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';

@Expose()
export class ForgotPasswordDto {
  @ApiProperty({ example: 'abc@gmail.com', description: 'Email' })
  @IsEmail()
  email: string;
}
