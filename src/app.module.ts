import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SellerModule } from './seller/seller.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [AuthModule, UsersModule, SellerModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
