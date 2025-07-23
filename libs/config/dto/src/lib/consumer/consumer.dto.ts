import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsDate, IsEnum } from 'class-validator';
import { Role, Gender } from '@nextcart/enum';

export class ConsumerDTO {
  @ApiProperty({ example: 123, description: 'Unique identifier of the consumer', required: false })
  @IsOptional()
  consumerId?: number;

  @ApiProperty({ example: 'user@example.com', description: 'Email address' })
  @IsEmail()
  email!: string;

  @ApiProperty({ description: 'Hashed password string' })
  @IsString()
  passwordHash!: string;

  @ApiProperty({ example: 'John', description: 'First name' })
  @IsString()
  name!: string;

  @ApiPropertyOptional({ example: 'Doe', description: 'Surname or last name' })
  @IsOptional()
  @IsString()
  surname?: string;

  @ApiProperty({ example: '1990-01-01T00:00:00Z', description: 'Date of birth' })
  @IsDate()
  dateOfBirth!: Date;

  @ApiPropertyOptional({ example: 'New York', description: 'Place of birth' })
  @IsOptional()
  @IsString()
  placeOfBirth?: string;

  @ApiProperty({ enum: Gender, description: 'Gender of the consumer' })
  @IsEnum(Gender)
  gender!: Gender;

  @ApiPropertyOptional({ example: '123 Main St, City, Country', description: 'Address' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ enum: Role, description: 'Role of the consumer' })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
