import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ credentials: true, origin: true });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Graduation Project Api Docs')
    .setDescription('졸업프로젝트 API 서버입니다.')
    .build();
  const swaggerOptions: SwaggerDocumentOptions = {
    operationIdFactory: (_, methodKey) => methodKey,
  };
  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerConfig,
    swaggerOptions,
  );
  SwaggerModule.setup('/docs', app, swaggerDocument);

  await app.listen(3097);
}
bootstrap();
