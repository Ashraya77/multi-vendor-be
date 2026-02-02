import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { SignupResponseDto } from './dto/SignupResponse';
import { LoginDto } from './dto/Logindata.dto';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/local/signup')
  async signupLocal(@Body() dto: AuthDto): Promise<SignupResponseDto> {
    return await this.authService.signupLocal(dto);
  }

  @Post('/local/signin')
  async signinLocal(@Body() dto: LoginDto) {
    return await this.authService.signinLocal(dto);
  }

  @Post('/logout')
  logout() {
    this.authService.logout();
  }

  @Post('/refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  refreshTokens(
    @Req()
    req: Request & {
      user: { sub: number; refreshToken: string };
    },
  ) {
    return this.authService.refreshTokens(req.user.sub, req.user.refreshToken);
  }
}
