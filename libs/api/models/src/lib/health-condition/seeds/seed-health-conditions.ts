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
  { healthConditionId: 'adolescent_female_11_14_years', description: 'Adolescent Female 11-14 years', categoryCode: 'age' },
  { healthConditionId: 'adolescent_female_14_17_years', description: 'Adolescent Female 14-17 years', categoryCode: 'age' },
  { healthConditionId: 'adolescent_male_11_14_years', description: 'Adolescent Male 11-14 years', categoryCode: 'age' },
  { healthConditionId: 'adolescent_male_15_17_years', description: 'Adolescent Male 15-17 years', categoryCode: 'age' },
  { healthConditionId: 'adult_female_18_29_years', description: 'Adult Female 18-29 years', categoryCode: 'age' },
  { healthConditionId: 'adult_female_30_59_years', description: 'Adult Female 30-59 years', categoryCode: 'age' },
  { healthConditionId: 'adult_female_60_74_years', description: 'Adult Female 60-74 years', categoryCode: 'age' },
  { healthConditionId: 'adult_male_18_29_years', description: 'Adult Male 18-29 years', categoryCode: 'age' },
  { healthConditionId: 'adult_male_30_59_years', description: 'Adult Male 30-59 years', categoryCode: 'age' },
  { healthConditionId: 'adult_male_60_74_years', description: 'Adult Male 60-74 years', categoryCode: 'age' },
  { healthConditionId: 'healthy_adult', description: 'Healthy Adult', categoryCode: 'age' },
  { healthConditionId: 'senior_female_over_74_years', description: 'Senior Female > 74 years', categoryCode: 'age' },
  { healthConditionId: 'senior_male_over_74_years', description: 'Senior Male > 74 years', categoryCode: 'age' },
  { healthConditionId: 'children_1_3_years', description: 'Children 1-3 years', categoryCode: 'age' },
  { healthConditionId: 'children_4_6_years', description: 'Children 4-6 years', categoryCode: 'age' },
  { healthConditionId: 'children_7_10_years', description: 'Children 7-10 years', categoryCode: 'age' },
  { healthConditionId: 'infant_6_12_months', description: 'Infant 6-12 months', categoryCode: 'age' },

  // Pathology / Health Conditions
  { healthConditionId: 'anemia', description: 'Anemia', categoryCode: 'pathology' },
  { healthConditionId: 'celiac_disease', description: 'Celiac disease', categoryCode: 'pathology' },
  { healthConditionId: 'diabetes', description: 'Diabetes', categoryCode: 'pathology' },
  { healthConditionId: 'lactose_intolerance', description: 'Lactose intolerance', categoryCode: 'pathology' },
  { healthConditionId: 'high_cholesterol', description: 'High cholesterol', categoryCode: 'pathology' },
  { healthConditionId: 'hypertension', description: 'Hypertension', categoryCode: 'pathology' },
  { healthConditionId: 'hyperthyroidism', description: 'Hyperthyroidism', categoryCode: 'pathology' },
  { healthConditionId: 'hypothyroidism', description: 'Hypothyroidism', categoryCode: 'pathology' },
  { healthConditionId: 'obesity', description: 'Obesity', categoryCode: 'pathology' },
  { healthConditionId: 'osteoporosis', description: 'Osteoporosis', categoryCode: 'pathology' },
  { healthConditionId: 'gastroesophageal_reflux', description: 'Gastroesophageal reflux', categoryCode: 'pathology' },

  // Physiological States
  { healthConditionId: 'breastfeeding', description: 'Breastfeeding', categoryCode: 'physiological_state' },
  { healthConditionId: 'pregnancy', description: 'Pregnancy', categoryCode: 'physiological_state' },
  { healthConditionId: 'pregnancy_1st_trimester', description: 'Pregnancy 1st trimester', categoryCode: 'physiological_state' },
  { healthConditionId: 'pregnancy_2nd_trimester', description: 'Pregnancy 2nd trimester', categoryCode: 'physiological_state' },
  { healthConditionId: 'pregnancy_3rd_trimester', description: 'Pregnancy 3rd trimester', categoryCode: 'physiological_state' },
  { healthConditionId: 'menopause', description: 'Menopause', categoryCode: 'physiological_state' },
];

// Definisci incompatibilità
const incompatibilitiesData = [
  { conditionId: 'infant_6_12_months', incompatibleWithId: 'breastfeeding' },
  { conditionId: 'infant_6_12_months', incompatibleWithId: 'pregnancy' },
  { conditionId: 'infant_6_12_months', incompatibleWithId: 'pregnancy_1st_trimester' },
  { conditionId: 'infant_6_12_months', incompatibleWithId: 'pregnancy_2nd_trimester' },
  { conditionId: 'infant_6_12_months', incompatibleWithId: 'pregnancy_3rd_trimester' },
  { conditionId: 'infant_6_12_months', incompatibleWithId: 'menopause' },

  { conditionId: 'adolescent_male_11_14_years', incompatibleWithId: 'breastfeeding' },
  { conditionId: 'adolescent_male_11_14_years', incompatibleWithId: 'pregnancy' },
  { conditionId: 'adolescent_male_11_14_years', incompatibleWithId: 'pregnancy_1st_trimester' },
  { conditionId: 'adolescent_male_11_14_years', incompatibleWithId: 'pregnancy_2nd_trimester' },
  { conditionId: 'adolescent_male_11_14_years', incompatibleWithId: 'pregnancy_3rd_trimester' },
  { conditionId: 'adolescent_male_11_14_years', incompatibleWithId: 'menopause' },

  { conditionId: 'adolescent_male_15_17_years', incompatibleWithId: 'breastfeeding' },
  { conditionId: 'adolescent_male_15_17_years', incompatibleWithId: 'pregnancy' },
  { conditionId: 'adolescent_male_15_17_years', incompatibleWithId: 'pregnancy_1st_trimester' },
  { conditionId: 'adolescent_male_15_17_years', incompatibleWithId: 'pregnancy_2nd_trimester' },
  { conditionId: 'adolescent_male_15_17_years', incompatibleWithId: 'pregnancy_3rd_trimester' },
  { conditionId: 'adolescent_male_15_17_years', incompatibleWithId: 'menopause' },

  { conditionId: 'adult_male_18_29_years', incompatibleWithId: 'breastfeeding' },
  { conditionId: 'adult_male_18_29_years', incompatibleWithId: 'pregnancy' },
  { conditionId: 'adult_male_18_29_years', incompatibleWithId: 'pregnancy_1st_trimester' },
  { conditionId: 'adult_male_18_29_years', incompatibleWithId: 'pregnancy_2nd_trimester' },
  { conditionId: 'adult_male_18_29_years', incompatibleWithId: 'pregnancy_3rd_trimester' },
  { conditionId: 'adult_male_18_29_years', incompatibleWithId: 'menopause' },

  { conditionId: 'adult_male_30_59_years', incompatibleWithId: 'breastfeeding' },
  { conditionId: 'adult_male_30_59_years', incompatibleWithId: 'pregnancy' },
  { conditionId: 'adult_male_30_59_years', incompatibleWithId: 'pregnancy_1st_trimester' },
  { conditionId: 'adult_male_30_59_years', incompatibleWithId: 'pregnancy_2nd_trimester' },
  { conditionId: 'adult_male_30_59_years', incompatibleWithId: 'pregnancy_3rd_trimester' },
  { conditionId: 'adult_male_30_59_years', incompatibleWithId: 'menopause' },

  { conditionId: 'adult_male_60_74_years', incompatibleWithId: 'breastfeeding' },
  { conditionId: 'adult_male_60_74_years', incompatibleWithId: 'pregnancy' },
  { conditionId: 'adult_male_60_74_years', incompatibleWithId: 'pregnancy_1st_trimester' },
  { conditionId: 'adult_male_60_74_years', incompatibleWithId: 'pregnancy_2nd_trimester' },
  { conditionId: 'adult_male_60_74_years', incompatibleWithId: 'pregnancy_3rd_trimester' },
  { conditionId: 'adult_male_60_74_years', incompatibleWithId: 'menopause' },

  { conditionId: 'children_1_3_years', incompatibleWithId: 'breastfeeding' },
  { conditionId: 'children_1_3_years', incompatibleWithId: 'pregnancy' },
  { conditionId: 'children_1_3_years', incompatibleWithId: 'pregnancy_1st_trimester' },
  { conditionId: 'children_1_3_years', incompatibleWithId: 'pregnancy_2nd_trimester' },
  { conditionId: 'children_1_3_years', incompatibleWithId: 'pregnancy_3rd_trimester' },
  { conditionId: 'children_1_3_years', incompatibleWithId: 'menopause' },

  { conditionId: 'children_4_6_years', incompatibleWithId: 'breastfeeding' },
  { conditionId: 'children_4_6_years', incompatibleWithId: 'pregnancy' },
  { conditionId: 'children_4_6_years', incompatibleWithId: 'pregnancy_1st_trimester' },
  { conditionId: 'children_4_6_years', incompatibleWithId: 'pregnancy_2nd_trimester' },
  { conditionId: 'children_4_6_years', incompatibleWithId: 'pregnancy_3rd_trimester' },
  { conditionId: 'children_4_6_years', incompatibleWithId: 'menopause' },

  { conditionId: 'children_7_10_years', incompatibleWithId: 'breastfeeding' },
  { conditionId: 'children_7_10_years', incompatibleWithId: 'pregnancy' },
  { conditionId: 'children_7_10_years', incompatibleWithId: 'pregnancy_1st_trimester' },
  { conditionId: 'children_7_10_years', incompatibleWithId: 'pregnancy_2nd_trimester' },
  { conditionId: 'children_7_10_years', incompatibleWithId: 'pregnancy_3rd_trimester' },
  { conditionId: 'children_7_10_years', incompatibleWithId: 'menopause' },

  { conditionId: 'senior_male_over_74_years', incompatibleWithId: 'breastfeeding' },
  { conditionId: 'senior_male_over_74_years', incompatibleWithId: 'pregnancy' },
  { conditionId: 'senior_male_over_74_years', incompatibleWithId: 'pregnancy_1st_trimester' },
  { conditionId: 'senior_male_over_74_years', incompatibleWithId: 'pregnancy_2nd_trimester' },
  { conditionId: 'senior_male_over_74_years', incompatibleWithId: 'pregnancy_3rd_trimester' },
  { conditionId: 'senior_male_over_74_years', incompatibleWithId: 'menopause' },

  { conditionId: 'senior_female_over_74_years', incompatibleWithId: 'breastfeeding' },
  { conditionId: 'senior_female_over_74_years', incompatibleWithId: 'pregnancy' },
  { conditionId: 'senior_female_over_74_years', incompatibleWithId: 'pregnancy_1st_trimester' },
  { conditionId: 'senior_female_over_74_years', incompatibleWithId: 'pregnancy_2nd_trimester' },
  { conditionId: 'senior_female_over_74_years', incompatibleWithId: 'pregnancy_3rd_trimester' },

  { conditionId: 'pregnancy_1st_trimester', incompatibleWithId: 'menopause' },
  { conditionId: 'pregnancy_2nd_trimester', incompatibleWithId: 'menopause' },
  { conditionId: 'pregnancy_3rd_trimester', incompatibleWithId: 'menopause' },
  { conditionId: 'pregnancy', incompatibleWithId: 'menopause' },
  { conditionId: 'breastfeeding', incompatibleWithId: 'menopause' },

  { conditionId: 'pregnancy_1st_trimester', incompatibleWithId: 'pregnancy_2nd_trimester' },
  { conditionId: 'pregnancy_1st_trimester', incompatibleWithId: 'pregnancy_3rd_trimester' },
  { conditionId: 'pregnancy_2nd_trimester', incompatibleWithId: 'pregnancy_1st_trimester' },
  { conditionId: 'pregnancy_2nd_trimester', incompatibleWithId: 'pregnancy_3rd_trimester' },
  { conditionId: 'pregnancy_3rd_trimester', incompatibleWithId: 'pregnancy_1st_trimester' },
  { conditionId: 'pregnancy_3rd_trimester', incompatibleWithId: 'pregnancy_2nd_trimester' },
];


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
        healthConditionId: hcData.healthConditionId,
        description: hcData.description,
        category: categoriesMap[hcData.categoryCode],
      });
      await healthConditionRepo.save(hc);
    }
  }

  // Seed incompatibilities
  for (const incData of incompatibilitiesData) {
    const condition = await healthConditionRepo.findOneBy({ healthConditionId: incData.conditionId });
    const incompatibleWith = await healthConditionRepo.findOneBy({ healthConditionId: incData.incompatibleWithId });

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
