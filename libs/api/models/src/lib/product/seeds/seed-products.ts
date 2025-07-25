import { DataSource } from 'typeorm';
import { Product } from '../product.entity'; // correggi il path se serve
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
    entities: ['libs/api/models/src/**/*.entity.{ts,js}'], // aggiusta il path
    synchronize: false,
    logging: false,
  });

  await dataSource.initialize();

  const productRepo = dataSource.getRepository(Product);

  // Svuota la tabella products
  await dataSource.query('TRUNCATE TABLE "product" CASCADE');

  // Leggi dati da JSON
  const jsonPath = path.resolve(__dirname, 'products.json');
  const productsData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  for (const productData of productsData) {
    const exists = await productRepo.findOneBy({ productId: productData.productId });
    if (!exists) {
      const product = productRepo.create({
        productId: productData.productId,
        description: productData.description,
        productCategory: productData.productCategory,
      });
      await productRepo.save(product);
    }
  }

  console.log('Seed Product completato.');
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('Errore nel seed Product:', err);
});
