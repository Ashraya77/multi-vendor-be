import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { SignupResponseDto } from './dto/SignupResponse';
import { LoginDto } from './dto/Logindata.dto';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { Roles, Role } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(@Body() dto: AuthDto): Promise<SignupResponseDto> {
    return await this.authService.signupLocal(dto);
  }

  @Post('/local/signin')
  @HttpCode(HttpStatus.OK)
  async signinLocal(@Body() dto: LoginDto) {
    return await this.authService.signinLocal(dto);
  }

  @Post('/logout')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request) {
    const user = req.user!;

    return await this.authService.logout(user['id']);
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

  @Get('user-only')
  @UseGuards(AuthGuard('at'), RolesGuard)
  @Roles(Role.user)
  userOnly() {
    return 'This is for users only';
  }
}
