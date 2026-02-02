// src/auth/dto/auth-response.dto.ts
import { Expose, Type } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { Role } from '@prisma/client';

export class TokensDto {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string | null;

  @Expose()
  @IsEnum(Role, { message: 'Role must be one of: user, seller, admin' })
  role?: Role;

  @Expose()
  createdAt: Date;
}

export class SignupResponseDto {
  @Expose()
  @Type(() => TokensDto)
  tokens: TokensDto;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;
}
