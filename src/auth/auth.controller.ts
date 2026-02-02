import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { SignupResponseDto } from './dto/SignupResponse';
import { LoginDto } from './dto/Logindata.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/local/signup')
  signupLocal(@Body() dto: AuthDto): Promise<SignupResponseDto> {
    return this.authService.signupLocal(dto);
  }

  @Post('/local/signin')
  signinLocal(@Body() dto: LoginDto) {
    return this.authService.signinLocal(dto);
  }

  @Post('/logout')
  logout() {
    this.authService.logout();
  }

  @Post('/refresh')
  refreshTokens() {
    this.authService.refreshTokens();
  }
}
