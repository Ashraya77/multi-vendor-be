import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SellerService } from './seller.service';
import { applySellerDto } from './dto/seller.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { VerifySellerDto } from './dto/verify-seller.dto';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post('apply')
  @UseGuards(AuthGuard('at'))
  async applyForSeller(@Body() dto: applySellerDto) {
    return this.sellerService.applyForSeller(dto);
  }

  @Post(':sellerId/verify')
  @UseGuards(AuthGuard('at'), RolesGuard)
  @Roles(Role.admin)
  async verify(
    @Param('sellerId') sellerId: string,
    @Body() dto: VerifySellerDto,
    @CurrentUser('id', ParseIntPipe) adminId: number,
  ) {
    return this.sellerService.verifySeller(sellerId, adminId, dto)
  }
}
