import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ShopModule } from 'src/shop/shop.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, ShopModule, AuthModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
