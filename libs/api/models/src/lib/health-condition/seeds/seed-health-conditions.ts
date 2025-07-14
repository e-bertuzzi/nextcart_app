// tools/seeds/seed-health-conditions.ts
import { DataSource } from 'typeorm';
import { HealthCondition } from '../health-condition.entity';
import { Consumer } from '../../consumer/consumer.entity';

const healthConditions = [
  'Adolescente Femmina 11-14 anni',
  'Adolescente Femmina 14-17 anni',
  'Adolescente Maschio 11-14 anni',
  'Adolescente Maschio 15-17 anni',
  'Adulto Femmina 18-29 anni',
  'Adulto Femmina 30-59 anni',
  'Adulto Femmina 60-74 anni',
  'Adulto Maschio 18-29 anni',
  'Adulto Maschio 30-59 anni',
  'Adulto Maschio 60-74 anni',
  'Adulto Sano',
  'Allattamento',
  'Anemia',
  'Anziano Femmina > 74 anni',
  'Anziano Maschio > 74 anni',
  'Bambini 1-3 anni',
  'Bambini 4-6 anni',
  'Bambini 7-10 anni',
  'Celiachia',
  'Diabete',
  'Gravidanza',
  'Gravidanza 1 trimestre',
  'Gravidanza 2 trimestre',
  'Gravidanza 3 trimestre',
  'Intolleranza al lattosio',
  'Ipercolesterolemia',
  'Ipertensione',
  'Ipertiroidismo',
  'Ipotiroidismo',
  'Lattante 6-12 mesi',
  'Menopausa',
  'Obesita',
  'Osteoporosi',
  'Reflusso Gastrico',
];

async function seed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'utente',
    password: 'utente123',
    database: 'nextcart',
    entities: [HealthCondition, Consumer],
    synchronize: false,
    logging: false,
    });

  await dataSource.initialize();

  const repo = dataSource.getRepository(HealthCondition);

  for (const description of healthConditions) {
    const exists = await repo.findOneBy({ description });
    if (!exists) {
      const hc = repo.create({ description });
      await repo.save(hc);
    }
  }

  console.log('Seeding completato.');
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('Errore durante il seeding:', err);
});
