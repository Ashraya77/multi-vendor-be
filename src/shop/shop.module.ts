import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { SellerModule } from 'src/seller/seller.module';

@Module({
  imports: [SellerModule],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
