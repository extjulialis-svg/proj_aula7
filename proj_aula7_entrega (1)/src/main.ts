import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useStaticAssets(join(process.cwd(), 'src', 'pratica', 'public'));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Aplicação rodando na porta ${port}`);
  console.log(`Front-end disponível em: http://localhost:${port}`);
}
bootstrap();
