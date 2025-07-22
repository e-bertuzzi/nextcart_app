import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumer, Diet, HealthCondition, HealthConditionCategory, HealthConditionIncompatibility, DietIncompatibility, BodyComposition, Activity, PhysicalActivity } from '@nextcart/models';
import { AuthModule } from '@nextcart/api-auth';
import { ProfileModule } from '@nextcart/profile';
import { HealthConditionModule } from '@nextcart/health-conditions'; 
import { ConfigModule } from '@nestjs/config';
import { DietModule } from '@nextcart/diet'
import { BodyCompositionModule } from '@nextcart/body-composition';
import { ActivityModule } from '@nextcart/activity';
import { PhysicalActivityModule } from '@nextcart/physical-activity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // o IP del DB
      port: 5432,
      username: 'utente',
      password: 'utente123',
      database: 'nextcart',
      entities: [Consumer, HealthCondition, HealthConditionCategory, HealthConditionIncompatibility, Diet,
        DietIncompatibility, BodyComposition, Activity, PhysicalActivity
      ],
      synchronize: true,
      logging: true,
      logger: 'advanced-console',
    }),
    AuthModule,
    ProfileModule,
    HealthConditionModule,
    DietModule,
    BodyCompositionModule,
    ActivityModule,
    PhysicalActivityModule,
    ConfigModule.forRoot({
      isGlobal: true, // disponibile ovunque
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
