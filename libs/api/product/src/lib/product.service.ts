// product.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Allergen,
  Claim,
  Diet,
  Product,
  ProductAllergen,
  ProductCategory,
  ProductClaim,
} from '@nextcart/models';
import { classToPlain } from 'class-transformer';
import { In, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Claim)
    private readonly claimRepo: Repository<Claim>,
    @InjectRepository(Allergen)
    private readonly allergenRepo: Repository<Allergen>,
    @InjectRepository(Diet)
    private readonly dietRepo: Repository<Diet>,
    @InjectRepository(ProductCategory)
    private readonly categoryRepo: Repository<ProductCategory>
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
    const product = this.productRepo.create({
      productId: data.productId,
      name: data.name,
      itName: data.itName,
    });

    // Categoria
    if (data.productCategory) {
      const category = await this.categoryRepo.findOneBy({
        productCategoryId: data.productCategory.productCategoryId,
      });
      product.productCategory = category ?? undefined;
    }

    // Claims
    if (data.productClaims) {
      const claimIds = data.productClaims.map((c) => c.claim.claimId);
      const claims = await this.claimRepo.findBy({ claimId: In(claimIds) });

      product.productClaims = claims.map((claim) => {
        const pc = new ProductClaim();
        pc.product = product;
        pc.claim = claim;
        pc.productId = product.productId;
        pc.claimId = claim.claimId;
        return pc;
      });
    }

    // Allergeni
    if (data.productAllergens) {
      const allergenIds = data.productAllergens.map(
        (a) => a.allergen.allergenId
      );
      const allergens = await this.allergenRepo.findBy({
        allergenId: In(allergenIds),
      });

      product.productAllergens = allergens.map((allergen) => {
        const pa = new ProductAllergen();
        pa.product = product;
        pa.allergen = allergen;
        pa.productId = product.productId;
        pa.allergenId = allergen.allergenId;
        return pa;
      });
    }

    // Idem per diete, ecc...

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
