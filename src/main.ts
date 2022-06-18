import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(3000, () => {
      Logger.debug(
      "Service Listening at PORT:" + PORT + "/" + globalPrefix
      );
  });

}
bootstrap();
