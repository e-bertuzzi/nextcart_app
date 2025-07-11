import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumer } from '@nextcart/models';
import { AuthModule } from '@nextcart/api-auth';
import { ProfileModule } from '@nextcart/profile';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // o IP del DB
      port: 5432,
      username: 'utente',
      password: 'utente123',
      database: 'nextcart',
      entities: [Consumer],
      synchronize: true, // IMPORTANTISSIMO: usa false in produzione
      //migrations: ['apps/backend/migrations/*.ts'],
      logging: true,
      logger: 'advanced-console',
    }),
    AuthModule,
    ProfileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
