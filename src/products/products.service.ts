import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ShopService } from 'src/shop/shop.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(
    private shopService: ShopService,
    private prisma: PrismaService,
  ) {}

  async createProduct(shopId: string, createProductDto: CreateProductDto) {
    const shop = await this.prisma.shop.findUnique({
      where: { id: shopId },
    });

    if (!shop) {
      throw new UnauthorizedException('Shop not found');
    }

    const product = await this.prisma.product.create({
      data: {
        shopId: createProductDto.shopId,
        name: createProductDto.name,
        price: createProductDto.price,
        description: createProductDto.description,
        stock: createProductDto.stock ?? 1, // Use default 1 if not provided
        images: createProductDto.images ?? [], // Use empty array if not provided
        category: createProductDto.category,
        isActive: createProductDto.isActive ?? true,
      },
    });
    return product;
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
