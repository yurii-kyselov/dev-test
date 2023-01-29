import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import secureSession from '@fastify/secure-session';
import config from 'config';
import { ExceptionTransformFilter } from './common/filters/exception-transform.filter';
import { ResponseTransformInterceptor } from './common/interceptors/response-transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.setGlobalPrefix('api');

  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalFilters(new ExceptionTransformFilter());

  await app.register(secureSession, {
    cookieName: config.session.name,
    secret: config.session.secret,
    salt: config.session.salt,
    cookie: {
      maxAge: config.session.cookieMaxAge,
      httpOnly: true,
    },
  });

  await app.listen(config.port);
}
bootstrap();
