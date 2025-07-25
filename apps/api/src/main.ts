/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('La documentazione della mia API REST')
    .setVersion('1.0')
    .addBearerAuth() // opzionale per JWT o autenticazione
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );

  // aggiunta manuale del prefisso api per permettere a swagger di comunicare in modo corretto sfruttando il prefisso globale
  for (const path in document.paths) {
    const newPath = `/${globalPrefix}${path}`;
    document.paths[newPath] = document.paths[path];
    delete document.paths[path];
  }

  SwaggerModule.setup('api-doc', app, document);
}

bootstrap();
