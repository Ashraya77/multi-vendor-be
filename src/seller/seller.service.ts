import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { applySellerDto } from './dto/seller.dto';
import { VerifySellerDto } from './dto/verify-seller.dto';
import { Role } from '@prisma/client';

@Injectable()
export class SellerService {
  constructor(private prisma: PrismaService) {}

  async applyForSeller(dto: applySellerDto) {
    const userId = parseInt(dto.userId, 10);
    if (isNaN(userId)) {
      throw new BadRequestException('Invalid user ID');
    }
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: { seller: true },
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }
    if (user.seller) {
      throw new ConflictException('User already has a seller profile');
    }

    const seller = await this.prisma.seller.create({
      data: {
        userId,
        businessName: dto.businessName,
        phone: dto.phone,
      },
      include: {
        user: {
          select: { id: true, email: true, name: true },
        },
      },
    });

    return {
      id: seller.id,
      userId: seller.userId,
      businessName: seller.businessName,
      phone: seller.phone,
      isVerified: seller.isVerified,
      createdAt: seller.createdAt,
    };
  }

  async verifySeller(sellerId: string, adminId: number, dto: VerifySellerDto) {
    const admin = await this.prisma.user.findUnique({
      where: { id: adminId },
    });

    if (!admin || admin.role !== Role.admin) {
      throw new ForbiddenException('The user is not admin');
    }

    const seller = await this.prisma.seller.findUnique({
      where: { id: sellerId },
      include: { user: true },
    });

    if (!seller) {
      throw new NotFoundException('Seller not found');
    }

    if (seller.isVerified) {
      throw new ConflictException('Selller is already verified');
    }

    if (dto.approve == true) {
      const updatedSeller = await this.prisma.seller.update({
        where: { id: sellerId },
        data: { isVerified: true },
      });

      return {
        id: updatedSeller.id,
        userId: updatedSeller.userId,
        businessName: updatedSeller.businessName,
        isVerified: true,
        message: 'Seller verified successfully.',
      };
    }
    if (!dto.approve) {
      throw new BadRequestException('rejection reason required');
    }

    await this.prisma.seller.delete({
      where: { id: sellerId },
    });
    return {
      message: 'Seller application rejected and removed.',
      reason: dto.reason,
    };
  }
}
