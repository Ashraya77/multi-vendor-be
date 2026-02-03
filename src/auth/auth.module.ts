import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { RtStrategy } from './strategies';
import { AtStrategy } from './strategies';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'rt-secret',
      signOptions: { expiresIn: '7d' },
    }),
    PrismaModule,
    ConfigModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, RtStrategy, AtStrategy],
})
export class AuthModule {}
