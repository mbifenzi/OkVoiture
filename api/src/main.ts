import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { MulterModule } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  // set headers to allow cookies
  MulterModule.registerAsync({
    useFactory: () => ({
      dest: './upload',
    }),
  });

  await app.listen(3000);
}
bootstrap();
