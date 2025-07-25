// product.controller.ts
import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@nextcart/models';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product | null> {
    return this.productService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Product>) {
    return this.productService.create(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
