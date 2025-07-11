import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Gender, Role } from '@nextcart/enum';

export class CreateConsumerDTO {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  surname?: string;

  dateOfBirth!: Date;

  @IsOptional()
  @IsString()
  placeOfBirth?: string;

  @IsEnum(Gender)
  gender: Gender = Gender.isMale;

  @IsOptional()
  @IsString()
  address?: string;

  @IsEnum(Role)
  role: Role = Role.isUser;
}