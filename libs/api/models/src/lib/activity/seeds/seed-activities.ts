import { DataSource } from 'typeorm';
import { Activity } from '../activity.entity'; // aggiusta path se serve
import * as fs from 'fs';
import * as path from 'path';
import { PhysicalActivity } from '../../physical-activity/physical-activity.entity';
import { Consumer } from '../../consumer/consumer.entity';
import { HealthCondition } from '../../health-condition/health-condition.entity';
import { HealthConditionCategory } from '../../health-condition/category/health-condition-category.entity';
import { HealthConditionIncompatibility } from '../../health-condition/incompatibility/health-condition-incompatibility.entity';
import { Diet } from '../../diet/diet.entity';
import { DietIncompatibility } from '../../diet/incompatibility/diet-incompatibility.entity';
import { BodyComposition } from '../../body-composition/body-composition.entity';

async function seed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'utente',
    password: 'utente123',
    database: 'nextcart',
    entities: [Activity, PhysicalActivity, Consumer, HealthCondition, HealthConditionCategory, HealthConditionIncompatibility, Diet, DietIncompatibility, BodyComposition],
    synchronize: false,
    logging: false,
  });

  await dataSource.initialize();

  const activityRepo = dataSource.getRepository(Activity);

  // Svuota la tabella activities (usando nome esatto tabella)
  await dataSource.query('TRUNCATE TABLE "activity" CASCADE');

  // Leggi dati da file JSON
  const jsonPath = path.resolve(__dirname, 'activities.json');
  const activitiesData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  for (const activityData of activitiesData) {
    const exists = await activityRepo.findOneBy({
      activityId: activityData.activityId,
    });
    if (!exists) {
      const activity = activityRepo.create({
        activityId: activityData.activityId,  
        MET: activityData.met,                
        ActivityType: activityData.activityType,  
        SpecificActivity: activityData.specificActivity,  
      });
      await activityRepo.save(activity);
    }
  }

  console.log('✅ Seed Activity completato.');
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('Errore nel seed Activity:', err);
});
