import { DataSource } from 'typeorm';
import { Diet } from '../diet.entity'; // correggi il path se serve
import { DietIncompatibility } from '../incompatibility/diet-incompatibility.entity';
import { Consumer } from '../../consumer/consumer.entity';
import { HealthCondition } from '../../health-condition/health-condition.entity';
import { HealthConditionCategory } from '../../health-condition/category/health-condition-category.entity';
import { HealthConditionIncompatibility } from '../../health-condition/incompatibility/health-condition-incompatibility.entity';

const dietsData = [
  {
    description: 'Celiachia',
    details: 'Non sono ammessi prodotti contenenti GLUTINE',
    restrictionLevel: 13,
  },
  {
    description: 'Halal',
    details:
      "Non è ammesso il maiale e l'alcol. Macellazione certificata halal",
    restrictionLevel: 14,
  },
  {
    description: 'Intolleranza al lattosio',
    details: 'Non sono ammessi prodotti contenenti lattosio',
    restrictionLevel: 15,
  },
  {
    description: 'Kosher',
    details:
      'Non sono ammessi maiale, crostacei. Macellazione certificata kosher',
    restrictionLevel: 16,
  },
  {
    description: 'Onnivora',
    details: 'Non ci sono restrizioni alimentari',
    restrictionLevel: 17,
  },
  {
    description: 'Ovolattovegetariana',
    details: 'Non sono ammessi carne e pesce',
    restrictionLevel: 18,
  },
  {
    description: 'Pescovegetariana',
    details: 'Non è ammessa la carne',
    restrictionLevel: 19,
  },
  {
    description: 'Reflusso Gastrico',
    details:
      'Non sono ammessi caffeina, teina, agrumi, aceto, pepe, peperoncino, bevande gassate, alcol',
    restrictionLevel: 20,
  },
  {
    description: 'Vegana',
    details: 'Non sono ammessi derivati animali',
    restrictionLevel: 21,
  },
];

async function seed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'utente',
    password: 'utente123',
    database: 'nextcart',
    entities: [
      Diet,
      DietIncompatibility,
      Consumer,
      HealthCondition,
      HealthConditionCategory,
      HealthConditionIncompatibility,
    ],
    synchronize: false,
    logging: false,
  });

  await dataSource.initialize();

  const dietRepo = dataSource.getRepository(Diet);

  // Svuota la tabella Diet con CASCADE
  await dataSource.query('TRUNCATE TABLE "diet" CASCADE');

  for (const dietData of dietsData) {
    const exists = await dietRepo.findOneBy({
      description: dietData.description,
    });
    if (!exists) {
      const diet = dietRepo.create({
        description: dietData.description,
        details: dietData.details, // <-- aggiunto qui
        restrictionLevel: dietData.restrictionLevel,
      });
      await dietRepo.save(diet);
    }
  }

  console.log('Seed Diet completato.');
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('Errore nel seed Diet:', err);
});
