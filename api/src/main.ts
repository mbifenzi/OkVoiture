import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { MulterModule } from '@nestjs/platform-express';
import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class MyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    return next.handle();
  }
}

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
  app.useGlobalInterceptors(new MyInterceptor());
  // set headers to allow cookies
  MulterModule.registerAsync({
    useFactory: () => ({
      dest: './upload',
    }),
  });

  await app.listen(3000);
}
bootstrap();
