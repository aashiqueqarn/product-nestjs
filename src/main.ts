import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { logger } from './config/logger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  try {
    logger.debug('Connection checking');
    await app.listen(3000);
  } catch (err: any) {
    logger.error(err);
    throw err;
  }
}
bootstrap();
