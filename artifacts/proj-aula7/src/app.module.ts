import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExemploModule } from './exemplo/exemplo.module';

async function getMongoUri(): Promise<string> {
  if (process.env.MONGODB_URI) {
    console.log('Usando MongoDB Atlas (MONGODB_URI)');
    return process.env.MONGODB_URI;
  }
  console.log('MONGODB_URI não definido — iniciando MongoDB em memória para testes...');
  const mongod = await MongoMemoryServer.create();
  return mongod.getUri();
}

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: await getMongoUri(),
      }),
    }),
    ExemploModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
