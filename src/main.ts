import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //cors
  app.enableCors(); 
  //prefijo API
  app.setGlobalPrefix(process.env.PREFIJO+"");
  //despliegue y puerto
  await app.listen(""+process.env.PORT );
}
bootstrap();
