import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exists',
      HttpStatus.NOT_FOUND,
    );
  }
}
