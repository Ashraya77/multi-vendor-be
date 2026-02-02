import { Role } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsEmail,
  IsEnum,
  IsOptional,
} from 'class-validator';

export class AuthDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsOptional()
  @IsEnum(Role, { message: 'Role must be one of: user, seller, admin' })
  role?: Role;
}
