/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger'
import { nestConfig } from 'config/partitioned-config';

async function bootstrap() {
  const PORT = nestConfig.PORT || 5000
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Документация по StackOverflow')
    .setDescription('Общая работа стажеров')
    .setVersion('1.0.0')
    .addTag('😜')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => console.log(`Сервер зарущен на порте ${PORT}`));
}
bootstrap();
