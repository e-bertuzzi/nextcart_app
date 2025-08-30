import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DietConsumerChoice, Product } from '@nextcart/models';
import { Repository } from 'typeorm';

@Injectable()
export class CompatibilityService {
  constructor(
    @InjectRepository(DietConsumerChoice)
    private dietConsumerRepo: Repository<DietConsumerChoice>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async checkProductCompatibility(
    consumerId: number,
    productId: string,
  ): Promise<boolean> {
    // diete del consumer
    const consumerDiets = await this.dietConsumerRepo.find({
      where: { consumer: { consumerId } },
      relations: ['diet'],
    });

    // prodotto con diete associate
    const product = await this.productRepo.findOne({
      where: { productId },
      relations: ['productDiets', 'productDiets.diet'],
    });

    if (!product) return true; // se non trovato → compatibile per default

    const consumerDietIds = consumerDiets.map((dc) => dc.diet.dietId);
    const productDietIds =
      product.productDiets?.map((pd) => pd.diet.dietId) ?? [];

    if (consumerDietIds.length === 0) return true; // utente senza diete → tutto ok
    if (productDietIds.length === 0) return false; // prodotto senza info → non compatibile

    return consumerDietIds.every((dietId) =>
      productDietIds.includes(dietId),
    );
  }
}
