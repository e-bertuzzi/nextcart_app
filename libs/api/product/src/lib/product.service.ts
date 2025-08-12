import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Allergen,
  Claim,
  Diet,
  NutritionalInformation,
  Product,
  ProductAllergen,
  ProductCategory,
  ProductClaim,
  ProductDiet,
  ProductNutritionalInfo,
} from '@nextcart/models';
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
    private readonly categoryRepo: Repository<ProductCategory>,
    @InjectRepository(NutritionalInformation)
    private readonly nutritionalInformationRepo: Repository<NutritionalInformation>,

    // Repository per entità ponte
    @InjectRepository(ProductClaim)
    private readonly productClaimRepo: Repository<ProductClaim>,

    @InjectRepository(ProductAllergen)
    private readonly productAllergenRepo: Repository<ProductAllergen>,

    @InjectRepository(ProductDiet)
    private readonly productDietRepo: Repository<ProductDiet>,

    @InjectRepository(ProductNutritionalInfo)
    private readonly productNutritionalInfoRepo: Repository<ProductNutritionalInfo>
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
        'nutritionalInformationValues.nutrient',
        'productDiets',
      ],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async create(data: Partial<Product>): Promise<Product> {
    const existingProduct = await this.productRepo.findOne({
      where: { productId: data.productId },
    });

    if (existingProduct) {
      throw new ConflictException(
        `Product with id ${data.productId} already exists`
      );
    }

    const product = this.productRepo.create({
      productId: data.productId,
      name: data.name,
      itName: data.itName,
    });

    if (data.productCategory) {
      const category = await this.categoryRepo.findOneBy({
        productCategoryId: data.productCategory.productCategoryId,
      });
      product.productCategory = category ?? undefined;
    }

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

    if (data.productDiets) {
      const dietIds = data.productDiets.map((d) => d.dietId);
      const diets = await this.dietRepo.findBy({
        dietId: In(dietIds),
      });

      product.productDiets = diets.map((diet) => {
        const pd = new ProductDiet();
        pd.product = product;
        pd.diet = diet;
        pd.productId = product.productId;
        pd.dietId = diet.dietId;
        return pd;
      });
    }

    if (
      data.nutritionalInformationValues &&
      data.nutritionalInformationValues.length > 0
    ) {
      const nutrientIds = data.nutritionalInformationValues.map((n) =>
        n.id.toString()
      );
      const nutrients = await this.nutritionalInformationRepo.findBy({
        nutrientId: In(nutrientIds),
      });

      product.nutritionalInformationValues = nutrients.map((nutrient) => {
        const info = new ProductNutritionalInfo();
        info.product = product;
        info.nutrient = nutrient;
        info.value = data.nutritionalInformationValues?.find(
          (n) => n.id.toString() === nutrient.nutrientId
        )?.value;
        return info;
      });
    }

    return this.productRepo.save(product);
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    await this.productRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.productRepo.delete(id);
  }

  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { productId: id },
      relations: [
        'productClaims',
        'productAllergens',
        'productDiets',
        'nutritionalInformationValues',
      ],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    product.name = data.name ?? product.name;
    product.itName = data.itName ?? product.itName;

    if (data.productCategory) {
      const category = await this.categoryRepo.findOneBy({
        productCategoryId: data.productCategory.productCategoryId,
      });
      product.productCategory = category ?? undefined;
    } else {
      product.productCategory = undefined;
    }

    if (data.productClaims) {
      // Elimina tutti i ProductClaim legati al prodotto
      await this.productClaimRepo.delete({ productId: product.productId });

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

    if (data.productAllergens) {
      await this.productAllergenRepo.delete({ productId: product.productId });

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

    if (data.productDiets) {
      await this.productDietRepo.delete({ productId: product.productId });

      const dietIds = data.productDiets.map((d) => d.dietId);
      const diets = await this.dietRepo.findBy({ dietId: In(dietIds) });

      product.productDiets = diets.map((diet) => {
        const pd = new ProductDiet();
        pd.product = product;
        pd.diet = diet;
        pd.productId = product.productId;
        pd.dietId = diet.dietId;
        return pd;
      });
    }

    if (data.nutritionalInformationValues) {
      await this.productClaimRepo.delete({ productId: product.productId });

      const nutrientIds = data.nutritionalInformationValues.map((n) =>
        n.id.toString()
      );
      const nutrients = await this.nutritionalInformationRepo.findBy({
        nutrientId: In(nutrientIds),
      });

      product.nutritionalInformationValues = nutrients.map((nutrient) => {
        const info = new ProductNutritionalInfo();
        info.product = product;
        info.nutrient = nutrient;
        info.value = data.nutritionalInformationValues?.find(
          (n) => n.id.toString() === nutrient.nutrientId
        )?.value;
        return info;
      });
    }

    return this.productRepo.save(product);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.productRepo.count({ where: { productId: id } });
    return count > 0;
  }
}
