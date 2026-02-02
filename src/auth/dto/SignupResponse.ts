// src/auth/dto/auth-response.dto.ts
import { Expose, Type } from 'class-transformer';

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
