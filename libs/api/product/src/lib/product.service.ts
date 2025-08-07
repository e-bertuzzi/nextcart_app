// product.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@nextcart/models';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepo.find({
      relations: [
        'productCategory',
        'productClaims',
        'productAllergens',
        'nutritionalInformationValues',
        'productDiets',
      ],
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { productId: id },
      relations: [
        'productCategory',
        'productClaims',
        'productClaims.claim',
        'productAllergens',
        'productAllergens.allergen',
        'nutritionalInformationValues',
        'productDiets',
      ],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async create(data: Partial<Product>): Promise<Product> {
    const product = this.productRepo.create(data);
    return this.productRepo.save(product);
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    await this.productRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.productRepo.delete(id);
  }
}
