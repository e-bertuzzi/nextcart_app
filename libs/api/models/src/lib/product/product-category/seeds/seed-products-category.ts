// seed-product-categories.ts
import { DataSource } from 'typeorm';
import { ProductCategory } from '../product-category.entity';
import { Allergen } from '../../../allergen';
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

  // 1. Svuota la tabella (ATTENZIONE: cancella anche le relazioni)
  await dataSource.query(`TRUNCATE TABLE "product_category" RESTART IDENTITY CASCADE`);

  // 2. Leggi il file JSON
  const filePath = path.resolve(__dirname, 'products_category.json');
  const categoriesData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // 3. Inserisci le categorie senza le relazioni parent e allergeni (solo campi base)
  for (const item of categoriesData) {
    const category = categoryRepo.create({
      productCategoryId: item.productCategoryId,
      description: item.description,
      typology: item.typology,
      // NON impostare allergens (stringa legacy)
      // NON impostare allergensList (lo fai dopo)
      //parent: null,
    });
    await categoryRepo.save(category);
  }

  // 4. Aggiungi i riferimenti parent
  for (const item of categoriesData) {
    if (item.parent) {
      const child = await categoryRepo.findOne({
        where: { productCategoryId: item.productCategoryId },
      });
      const parent = await categoryRepo.findOne({
        where: { productCategoryId: item.parent },
      });
      if (child && parent) {
        child['parent'] = parent;
        await categoryRepo.save(child);
      }
    }
  }

  // 5. Aggiungi le relazioni ManyToMany allergensList
  for (const item of categoriesData) {
    if (item.allergensList && item.allergensList.length > 0) {
      const category = await categoryRepo.findOne({
        where: { productCategoryId: item.productCategoryId },
        relations: ['allergensList'],
      });
      if (!category) continue;

      // Inizializza la lista se null/undefined
      if (!category['allergensList']) category['allergensList'] = [];

      for (const allergenId of item.allergensList) {
        // Recupera allergene da DB
        const allergen = await allergenRepo.findOne({
          where: { allergenId },
        });
        if (!allergen) {
          console.warn(`Allergen non trovato: ${allergenId}`);
          continue;
        }

        // Evita duplicati
        if (!category['allergensList'].find((a: { allergenId: any; }) => a.allergenId === allergen['allergenId'])) {
          category['allergensList'].push(allergen);
        }
      }
      await categoryRepo.save(category);
    }
  }

  console.log('Seed ProductCategory completato!');
  await dataSource.destroy();
}

seed().catch(err => {
  console.error('Errore nel seed ProductCategory:', err);
});
