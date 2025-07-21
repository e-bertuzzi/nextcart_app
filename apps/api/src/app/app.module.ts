import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumer, Diet, HealthCondition, HealthConditionCategory, HealthConditionIncompatibility, DietIncompatibility } from '@nextcart/models';
import { AuthModule } from '@nextcart/api-auth';
import { ProfileModule } from '@nextcart/profile';
import { HealthConditionModule } from '@nextcart/health-conditions'; 
import { ConfigModule } from '@nestjs/config';
import { DietModule } from '@nextcart/diet'
import { BodyComposition } from 'libs/api/models/src/lib/body-composition/body-composition.entity';

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
        DietIncompatibility, BodyComposition
      ],
      synchronize: true,
      logging: true,
      logger: 'advanced-console',
    }),
    AuthModule,
    ProfileModule,
    HealthConditionModule,
    DietModule,
    ConfigModule.forRoot({
      isGlobal: true, // disponibile ovunque
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
