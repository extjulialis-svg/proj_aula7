import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PraticaModule } from './pratica/pratica.module';

async function getMongoUri(): Promise<string> {
  if (process.env.MONGODB_URI) {
    console.log('Usando MongoDB Atlas (MONGODB_URI)');
    return process.env.MONGODB_URI;
  }
  console.log('Iniciando MongoDB em memória para testes...');
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
    PraticaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
