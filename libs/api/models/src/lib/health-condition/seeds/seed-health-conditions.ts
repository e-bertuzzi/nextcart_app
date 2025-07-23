import { DataSource } from 'typeorm';
import { HealthCondition } from '../health-condition.entity';
import { HealthConditionCategory } from '../category/health-condition-category.entity'; 
import { HealthConditionIncompatibility } from '../incompatibility/health-condition-incompatibility.entity'; 

const categoriesData = [
  { code: 'age', label: 'Age Group' },
  { code: 'pathology', label: 'Health Conditions' },
  { code: 'physiological_state', label: 'Physiological States' },
];

// Mappa categoria code => entity (riempita dopo init)
const categoriesMap: Record<string, HealthConditionCategory> = {};

const healthConditionsData = [
  // Age Group
  { description: 'Adolescent Female 11-14 years', categoryCode: 'age' },
  { description: 'Adolescent Female 14-17 years', categoryCode: 'age' },
  { description: 'Adolescent Male 11-14 years', categoryCode: 'age' },
  { description: 'Adolescent Male 15-17 years', categoryCode: 'age' },
  { description: 'Adult Female 18-29 years', categoryCode: 'age' },
  { description: 'Adult Female 30-59 years', categoryCode: 'age' },
  { description: 'Adult Female 60-74 years', categoryCode: 'age' },
  { description: 'Adult Male 18-29 years', categoryCode: 'age' },
  { description: 'Adult Male 30-59 years', categoryCode: 'age' },
  { description: 'Adult Male 60-74 years', categoryCode: 'age' },
  { description: 'Healthy Adult', categoryCode: 'age' },
  { description: 'Senior Female > 74 years', categoryCode: 'age' },
  { description: 'Senior Male > 74 years', categoryCode: 'age' },
  { description: 'Children 1-3 years', categoryCode: 'age' },
  { description: 'Children 4-6 years', categoryCode: 'age' },
  { description: 'Children 7-10 years', categoryCode: 'age' },
  { description: 'Infant 6-12 months', categoryCode: 'age' },

  // Pathology / Health Conditions
  { description: 'Anemia', categoryCode: 'pathology' },
  { description: 'Celiac disease', categoryCode: 'pathology' },
  { description: 'Diabetes', categoryCode: 'pathology' },
  { description: 'Lactose intolerance', categoryCode: 'pathology' },
  { description: 'High cholesterol', categoryCode: 'pathology' },
  { description: 'Hypertension', categoryCode: 'pathology' },
  { description: 'Hyperthyroidism', categoryCode: 'pathology' },
  { description: 'Hypothyroidism', categoryCode: 'pathology' },
  { description: 'Obesity', categoryCode: 'pathology' },
  { description: 'Osteoporosis', categoryCode: 'pathology' },
  { description: 'Gastroesophageal reflux', categoryCode: 'pathology' },

  // Physiological States
  { description: 'Breastfeeding', categoryCode: 'physiological_state' },
  { description: 'Pregnancy', categoryCode: 'physiological_state' },
  { description: 'Pregnancy 1st trimester', categoryCode: 'physiological_state' },
  { description: 'Pregnancy 2nd trimester', categoryCode: 'physiological_state' },
  { description: 'Pregnancy 3rd trimester', categoryCode: 'physiological_state' },
  { description: 'Menopause', categoryCode: 'physiological_state' },
];

// Definisci incompatibilità
const incompatibilitiesData = [
  // "Infant 6-12 months" incompatible with "Menopause"
  { conditionDescription: 'Infant 6-12 months', incompatibleWithDescription: 'Breastfeeding' },
  { conditionDescription: 'Infant 6-12 months', incompatibleWithDescription: 'Pregnancy' },
  { conditionDescription: 'Infant 6-12 months', incompatibleWithDescription: 'Pregnancy 1st trimester' },
  { conditionDescription: 'Infant 6-12 months', incompatibleWithDescription: 'Pregnancy 2nd trimester' },
  { conditionDescription: 'Infant 6-12 months', incompatibleWithDescription: 'Pregnancy 3rd trimester' },
  { conditionDescription: 'Infant 6-12 months', incompatibleWithDescription: 'Menopause' },

  { conditionDescription: 'Adolescent Male 11-14 years', incompatibleWithDescription: 'Breastfeeding' },
  { conditionDescription: 'Adolescent Male 11-14 years', incompatibleWithDescription: 'Pregnancy' },
  { conditionDescription: 'Adolescent Male 11-14 years', incompatibleWithDescription: 'Pregnancy 1st trimester' },
  { conditionDescription: 'Adolescent Male 11-14 years', incompatibleWithDescription: 'Pregnancy 2nd trimester' },
  { conditionDescription: 'Adolescent Male 11-14 years', incompatibleWithDescription: 'Pregnancy 3rd trimester' },

  { conditionDescription: 'Adolescent Male 11-14 years', incompatibleWithDescription: 'Menopause' },
  { conditionDescription: 'Adolescent Male 15-17 years', incompatibleWithDescription: 'Breastfeeding' },
  { conditionDescription: 'Adolescent Male 15-17 years', incompatibleWithDescription: 'Pregnancy' },
  { conditionDescription: 'Adolescent Male 15-17 years', incompatibleWithDescription: 'Pregnancy 1st trimester' },
  { conditionDescription: 'Adolescent Male 15-17 years', incompatibleWithDescription: 'Pregnancy 2nd trimester' },
  { conditionDescription: 'Adolescent Male 15-17 years', incompatibleWithDescription: 'Pregnancy 3rd trimester' },
  { conditionDescription: 'Adolescent Male 15-17 years', incompatibleWithDescription: 'Menopause' },

  { conditionDescription: 'Adult Male 18-29 years', incompatibleWithDescription: 'Breastfeeding' },
  { conditionDescription: 'Adult Male 18-29 years', incompatibleWithDescription: 'Pregnancy' },
  { conditionDescription: 'Adult Male 18-29 years', incompatibleWithDescription: 'Pregnancy 1st trimester' },
  { conditionDescription: 'Adult Male 18-29 years', incompatibleWithDescription: 'Pregnancy 2nd trimester' },
  { conditionDescription: 'Adult Male 18-29 years', incompatibleWithDescription: 'Pregnancy 3rd trimester' },
  { conditionDescription: 'Adult Male 18-29 years', incompatibleWithDescription: 'Menopause' },

  { conditionDescription: 'Adult Male 30-59 years', incompatibleWithDescription: 'Breastfeeding' },
  { conditionDescription: 'Adult Male 30-59 years', incompatibleWithDescription: 'Pregnancy' },
  { conditionDescription: 'Adult Male 30-59 years', incompatibleWithDescription: 'Pregnancy 1st trimester' },
  { conditionDescription: 'Adult Male 30-59 years', incompatibleWithDescription: 'Pregnancy 2nd trimester' },
  { conditionDescription: 'Adult Male 30-59 years', incompatibleWithDescription: 'Pregnancy 3rd trimester' },
  { conditionDescription: 'Adult Male 30-59 years', incompatibleWithDescription: 'Menopause' },

  { conditionDescription: 'Adult Male 60-74 years', incompatibleWithDescription: 'Breastfeeding' },
  { conditionDescription: 'Adult Male 60-74 years', incompatibleWithDescription: 'Pregnancy' },
  { conditionDescription: 'Adult Male 60-74 years', incompatibleWithDescription: 'Pregnancy 1st trimester' },
  { conditionDescription: 'Adult Male 60-74 years', incompatibleWithDescription: 'Pregnancy 2nd trimester' },
  { conditionDescription: 'Adult Male 60-74 years', incompatibleWithDescription: 'Pregnancy 3rd trimester' },
  { conditionDescription: 'Adult Male 60-74 years', incompatibleWithDescription: 'Menopause' },

  { conditionDescription: 'Children 1-3 years', incompatibleWithDescription: 'Breastfeeding' },
  { conditionDescription: 'Children 1-3 years', incompatibleWithDescription: 'Pregnancy' },
  { conditionDescription: 'Children 1-3 years', incompatibleWithDescription: 'Pregnancy 1st trimester' },
  { conditionDescription: 'Children 1-3 years', incompatibleWithDescription: 'Pregnancy 2nd trimester' },
  { conditionDescription: 'Children 1-3 years', incompatibleWithDescription: 'Pregnancy 3rd trimester' },
  { conditionDescription: 'Children 1-3 years', incompatibleWithDescription: 'Menopause' },

  { conditionDescription: 'Children 4-6 years', incompatibleWithDescription: 'Breastfeeding' },
  { conditionDescription: 'Children 4-6 years', incompatibleWithDescription: 'Pregnancy' },
  { conditionDescription: 'Children 4-6 years', incompatibleWithDescription: 'Pregnancy 1st trimester' },
  { conditionDescription: 'Children 4-6 years', incompatibleWithDescription: 'Pregnancy 2nd trimester' },
  { conditionDescription: 'Children 4-6 years', incompatibleWithDescription: 'Pregnancy 3rd trimester' },
  { conditionDescription: 'Children 4-6 years', incompatibleWithDescription: 'Menopause' },

  { conditionDescription: 'Children 7-10 years', incompatibleWithDescription: 'Breastfeeding' },
  { conditionDescription: 'Children 7-10 years', incompatibleWithDescription: 'Pregnancy' },
  { conditionDescription: 'Children 7-10 years', incompatibleWithDescription: 'Pregnancy 1st trimester' },
  { conditionDescription: 'Children 7-10 years', incompatibleWithDescription: 'Pregnancy 2nd trimester' },
  { conditionDescription: 'Children 7-10 years', incompatibleWithDescription: 'Pregnancy 3rd trimester' },
  { conditionDescription: 'Children 7-10 years', incompatibleWithDescription: 'Menopause' },

  { conditionDescription: 'Infant 6-12 months', incompatibleWithDescription: 'Breastfeeding' },
  { conditionDescription: 'Infant 6-12 months', incompatibleWithDescription: 'Pregnancy' },
  { conditionDescription: 'Infant 6-12 months', incompatibleWithDescription: 'Pregnancy 1st trimester' },
  { conditionDescription: 'Infant 6-12 months', incompatibleWithDescription: 'Pregnancy 2nd trimester' },
  { conditionDescription: 'Infant 6-12 months', incompatibleWithDescription: 'Pregnancy 3rd trimester' },
  { conditionDescription: 'Infant 6-12 months', incompatibleWithDescription: 'Menopause' },

  { conditionDescription: 'Senior Male > 74 years', incompatibleWithDescription: 'Breastfeeding' },
  { conditionDescription: 'Senior Male > 74 years', incompatibleWithDescription: 'Pregnancy' },
  { conditionDescription: 'Senior Male > 74 years', incompatibleWithDescription: 'Pregnancy 1st trimester' },
  { conditionDescription: 'Senior Male > 74 years', incompatibleWithDescription: 'Pregnancy 2nd trimester' },
  { conditionDescription: 'Senior Male > 74 years', incompatibleWithDescription: 'Pregnancy 3rd trimester' },
  { conditionDescription: 'Senior Male > 74 years', incompatibleWithDescription: 'Menopause' },

  { conditionDescription: 'Senior Female > 74 years', incompatibleWithDescription: 'Breastfeeding' },
  { conditionDescription: 'Senior Female > 74 years', incompatibleWithDescription: 'Pregnancy' },
  { conditionDescription: 'Senior Female > 74 years', incompatibleWithDescription: 'Pregnancy 1st trimester' },
  { conditionDescription: 'Senior Female > 74 years', incompatibleWithDescription: 'Pregnancy 2nd trimester' },
  { conditionDescription: 'Senior Female > 74 years', incompatibleWithDescription: 'Pregnancy 3rd trimester' },

  { conditionDescription: 'Pregnancy 1st trimester', incompatibleWithDescription: 'Menopause' },
  { conditionDescription: 'Pregnancy 2nd trimester', incompatibleWithDescription: 'Menopause' },
  { conditionDescription: 'Pregnancy 3rd trimester', incompatibleWithDescription: 'Menopause' },
  { conditionDescription: 'Pregnancy', incompatibleWithDescription: 'Menopause' },
  { conditionDescription: 'Breastfeeding', incompatibleWithDescription: 'Menopause' },
  { conditionDescription: 'Pregnancy 1st trimester', incompatibleWithDescription: 'Pregnancy 2nd trimester' },
  { conditionDescription: 'Pregnancy 1st trimester', incompatibleWithDescription: 'Pregnancy 3rd trimester' },
  { conditionDescription: 'Pregnancy 2nd trimester', incompatibleWithDescription: 'Pregnancy 1st trimester' },
  { conditionDescription: 'Pregnancy 2nd trimester', incompatibleWithDescription: 'Pregnancy 3rd trimester' },
  { conditionDescription: 'Pregnancy 3rd trimester', incompatibleWithDescription: 'Pregnancy 1st trimester' },
  { conditionDescription: 'Pregnancy 3rd trimester', incompatibleWithDescription: 'Pregnancy 2nd trimester' },
]

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

  const categoryRepo = dataSource.getRepository(HealthConditionCategory);
  const healthConditionRepo = dataSource.getRepository(HealthCondition);
  const incompatibilityRepo = dataSource.getRepository(HealthConditionIncompatibility);

  // Prima tronca la tabella di join con CASCADE
  await dataSource.query('TRUNCATE TABLE "consumer_health_conditions_health_condition" CASCADE');

  // Poi tronca le tabelle collegate in ordine corretto, sempre con CASCADE
  await dataSource.query('TRUNCATE TABLE "health_condition_incompatibility" CASCADE');
  await dataSource.query('TRUNCATE TABLE "health_condition" CASCADE');
  await dataSource.query('TRUNCATE TABLE "health_condition_category" CASCADE');

  // Seed categories (se non esistono)
  for (const catData of categoriesData) {
    let category = await categoryRepo.findOneBy({ code: catData.code });
    if (!category) {
      category = categoryRepo.create(catData);
      await categoryRepo.save(category);
    }
    categoriesMap[catData.code] = category;
  }

  // Seed health conditions associandoli alla categoria corretta
  for (const hcData of healthConditionsData) {
    const exists = await healthConditionRepo.findOneBy({ description: hcData.description });
    if (!exists) {
      const hc = healthConditionRepo.create({
        description: hcData.description,
        category: categoriesMap[hcData.categoryCode],
      });
      await healthConditionRepo.save(hc);
    }
  }

  // Seed incompatibilities
  for (const incData of incompatibilitiesData) {
    const condition = await healthConditionRepo.findOneBy({ description: incData.conditionDescription });
    const incompatibleWith = await healthConditionRepo.findOneBy({ description: incData.incompatibleWithDescription });

    if (condition && incompatibleWith) {
      // Controlla se esiste già per evitare duplicati
      const exists = await incompatibilityRepo.findOne({
        where: {
          condition: condition,
          incompatibleWith: incompatibleWith,
        },
        relations: ['condition', 'incompatibleWith'],
      });
      if (!exists) {
        const incompatibility = incompatibilityRepo.create({
          condition,
          incompatibleWith,
        });
        await incompatibilityRepo.save(incompatibility);
      }
    }
  }

  console.log('Seeding completato.');
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('Errore durante il seeding:', err);
});
