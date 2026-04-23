import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard('at'))
  @Post(':shopId/createProduct')
  create(
    @Param('shopId') shopId: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.createProduct(shopId, createProductDto);
  }

  // @Get('')
  // async findAll() {
  //   return await this.productsService.findAll();
  // }

  @Get()
  findThem(@Query() query: { search?: string }) {
    return this.productsService.findThem(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
