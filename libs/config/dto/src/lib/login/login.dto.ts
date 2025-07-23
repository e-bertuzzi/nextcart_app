import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address used for login',
  })
  @IsString()
  email!: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'User password',
  })
  @IsString()
  password!: string;
}
