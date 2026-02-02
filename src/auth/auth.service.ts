import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClientInitializationError } from '@prisma/client/runtime/library';
import { SignupResponseDto } from './dto/SignupResponse';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private hashData(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }

  private async verifyHash(data: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(data, hash);
  }

  async signupLocal(dto: AuthDto): Promise<SignupResponseDto> {
    try {
      const normalizedEmail = dto.email.toLowerCase().trim();

      const existingUser = await this.prisma.user.findUnique({
        where: {
          email: normalizedEmail,
        },
      });

      if (existingUser) {
        throw new ConflictException('Email already in use');
      }
      const hash = await this.hashData(dto.password);
      const newUser = await this.prisma.user.create({
        data: {
          name: dto.name,
          role: dto.role,
          email: normalizedEmail,
          password: hash,
        },
      });

      const tokens = await this.getTokens(newUser.id, newUser.email);

      await this.updateRtHash(newUser.id, tokens.refresh_token);

      return {
        tokens: {
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
        },
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          createdAt: newUser.createdAt,
        },
      };
    } catch (error) {
      if (error instanceof PrismaClientInitializationError) {
        if (error.errorCode === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }
      throw error;
    }
  }

  async updateRtHash(userId: number, rt: string) {
    const hash = await this.hashData(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }
  async getTokens(userId: number, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
  signinLocal() {}

  logout() {}

  refreshTokens() {}
}
