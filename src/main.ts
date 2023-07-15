import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  //app.useGlobalPipes(new ValidityState());
  app.setGlobalPrefix('api/v1');
  await app.listen(PORT);
  console.log(`Server listening on port ${PORT}`);
}
bootstrap();
