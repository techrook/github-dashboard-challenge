import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(
    new GlobalExceptionFilter(),
  );

  app.useGlobalInterceptors(
    new ResponseInterceptor(),
  );
  const config = new DocumentBuilder()
  .setTitle('GitHub Developer Dashboard API')
  .setDescription(
    'Backend API for fetching GitHub user profiles, repositories, languages, statistics, and recent public activity.',
  )
  .setVersion('1.0.0')
  .addTag('GitHub')
  .build();

const document = SwaggerModule.createDocument(app, config);

SwaggerModule.setup('docs', app, document);

  const configService = app.get<ConfigService>(ConfigService);
  const port = process.env.PORT || configService.get('port');
  await app.listen(port);
}
bootstrap();
