import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { SellerService } from 'src/seller/seller.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShopService {
  constructor(
    private sellerService: SellerService,
    private prisma: PrismaService,
  ) {}

  async createShop(sellerId: string, dto: CreateShopDto) {
    const seller = await this.prisma.seller.findUnique({
      where: { id: sellerId },
    });

    if (!seller) {
      throw new NotFoundException('seller is not registered');
    }

    if (!seller.isVerified) {
      throw new UnauthorizedException('seller is not verified');
    }

    return this.prisma.shop.create({
      data: {
        name: dto.businessName,
        seller: {
          connect: { id: sellerId },
        },
      },
      include: {
        seller: {
          select: { id: true, businessName: true },
        },
      },
    });
  }

  findAll() {
    return `This action returns all shop`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shop`;
  }

  update(id: number, updateShopDto: UpdateShopDto) {
    return `This action updates a #${id} shop`;
  }

  remove(id: number) {
    return `This action removes a #${id} shop`;
  }
}
