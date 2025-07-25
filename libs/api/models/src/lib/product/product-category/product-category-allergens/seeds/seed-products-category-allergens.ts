import { DataSource } from 'typeorm';
import { ProductCategory } from '../../product-category.entity';
import { Allergen } from '../../../../allergen';
import * as fs from 'fs';
import * as path from 'path';

async function seed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'utente',
    password: 'utente123',
    database: 'nextcart',
    entities: ['libs/api/models/src/**/*.entity.{ts,js}'],
    synchronize: false,
    logging: false,
  });

  await dataSource.initialize();

  const categoryRepo = dataSource.getRepository(ProductCategory);
  const allergenRepo = dataSource.getRepository(Allergen);

  // 1. Truncate product_category_allergens_list_allergen (tabella join many-to-many)
  await dataSource.query(`TRUNCATE TABLE "product_category_allergens_list_allergen" CASCADE`);

  // 2. Carica il file JSON con le associazioni many-to-many
  const relationsPath = path.resolve(__dirname, 'products-category-allergens.json');
  const relationsData: { productCategoryId: string; allergenId: string }[] = JSON.parse(
    fs.readFileSync(relationsPath, 'utf-8')
  );

  for (const rel of relationsData) {
    // Trova categoria e allergene
    const category = await categoryRepo.findOne({
      where: { productCategoryId: rel.productCategoryId },
      relations: ['allergensList'],
    });
    if (!category) {
      console.warn(`Categoria non trovata: ${rel.productCategoryId}`);
      continue;
    }

    const allergen = await allergenRepo.findOne({
      where: { allergenId: rel.allergenId },
    });
    if (!allergen) {
      console.warn(`Allergene non trovato: ${rel.allergenId}`);
      continue;
    }

    if (!category.allergensList) {
      category.allergensList = [];
    }

    // Evita duplicati
    if (!category.allergensList.find(a => a.allergenId === allergen.allergenId)) {
      category.allergensList.push(allergen);
    }

    // Salva la categoria con l'allergene associato
    await categoryRepo.save(category);
  }

  console.log('Seed associazioni ProductCategory <-> Allergen completato!');

  await dataSource.destroy();
}

seed().catch(err => {
  console.error('Errore nel seed:', err);
});
