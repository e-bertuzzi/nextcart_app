import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumer } from '@nextcart/models';
import { AuthModule } from '@nextcart/api-auth';
import { ProfileModule } from '@nextcart/profile';
import { ConfigModule } from '@nestjs/config';

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
      synchronize: true,
      logging: true,
      logger: 'advanced-console',
    }),
    AuthModule,
    ProfileModule,
    ConfigModule.forRoot({
      isGlobal: true, // disponibile ovunque
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
