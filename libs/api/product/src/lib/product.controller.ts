import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Product } from '@nextcart/models';
import { ProductService } from './product.service';
import { instanceToPlain } from 'class-transformer';
import { JwtAuthGuard, Roles, RolesGuard } from '@nextcart/api-auth';
import { Role } from '@nextcart/enum';

@ApiTags('Products') // Tag per raggruppare le API in Swagger
@UseGuards(JwtAuthGuard, RolesGuard) // Protegge tutto il controller (facoltativo)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('check')
  @Roles(Role.isAdmin)
  @ApiOperation({ summary: 'Check if a product exists by ID' })
  @ApiResponse({
    status: 200,
    description: 'Product existence status',
    schema: {
      example: { exists: true },
    },
  })
  async checkExists(@Query('id') id: string): Promise<{ exists: boolean }> {
    const exists = await this.productService.exists(id);
    return { exists };
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'List of all products',
    type: [Product],
  })
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID', type: String })
  @ApiResponse({ status: 200, description: 'Product found', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found' })
  findOne(@Param('id') id: string): Promise<Product | null> {
    return this.productService.findOne(id);
  }

  @Post('create')
  @Roles(Role.isAdmin)
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: Product })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    type: Product,
  })
  create(@Body() data: Partial<Product>) {
    return instanceToPlain(this.productService.create(data));
  }

  @Delete(':id')
  @Roles(Role.isAdmin)
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID', type: String })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  @Put(':id')
  @Roles(Role.isAdmin)
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID', type: String })
  @ApiBody({ type: Product })
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully',
    type: Product,
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async update(@Param('id') id: string, @Body() data: Partial<Product>) {
    return instanceToPlain(await this.productService.updateProduct(id, data));
  }

  
}
