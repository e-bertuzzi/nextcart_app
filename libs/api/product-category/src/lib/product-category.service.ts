import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from '@nextcart/models';
import { CreateProductCategoryDto } from '@nextcart/dto';
import { UpdateProductCategoryDto } from '@nextcart/dto';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepo: Repository<ProductCategory>,
  ) {}

  async findAll(): Promise<ProductCategory[]> {
    return this.productCategoryRepo.find({
      relations: ['products', 'allergenLinks'], // opzionale
    });
  }

  async findOne(id: string): Promise<ProductCategory> {
    const category = await this.productCategoryRepo.findOne({
      where: { productCategoryId: id },
      relations: ['products', 'allergenLinks'],
    });
    if (!category) {
      throw new NotFoundException(`ProductCategory ${id} not found`);
    }
    return category;
  }

  async create(dto: CreateProductCategoryDto): Promise<ProductCategory> {
    const category = this.productCategoryRepo.create(dto);
    return this.productCategoryRepo.save(category);
  }

  async update(id: string, dto: UpdateProductCategoryDto): Promise<ProductCategory> {
    const category = await this.findOne(id);
    Object.assign(category, dto);
    return this.productCategoryRepo.save(category);
  }

  async remove(id: string): Promise<void> {
    const category = await this.findOne(id);
    await this.productCategoryRepo.remove(category);
  }
}
