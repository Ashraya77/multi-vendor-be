import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ShopModule } from 'src/shop/shop.module';

@Module({
  imports: [PrismaModule, ShopModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
