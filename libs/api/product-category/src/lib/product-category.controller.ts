import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { CreateProductCategoryDto } from '@nextcart/dto';
import { UpdateProductCategoryDto } from '@nextcart/dto';
import { ProductCategory } from '@nextcart/models';

@Controller('product-categories')
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  @Get()
  findAll(): Promise<ProductCategory[]> {
    return this.productCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductCategory> {
    return this.productCategoryService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateProductCategoryDto): Promise<ProductCategory> {
    return this.productCategoryService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductCategoryDto,
  ): Promise<ProductCategory> {
    return this.productCategoryService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.productCategoryService.remove(id);
  }
}
