import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  //para mandar a llamar a los archivos estaticos, como las imagenes, css, js, etc.
  app.useStaticAssets('public');
  await app.listen(process.env.PORT ?? port);
}
bootstrap();
