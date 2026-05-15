import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExemploController } from './exemplo.controller';
import { ExemploService } from './exemplo.service';
import { Exemplo, ExemploSchema } from './exemplo.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Exemplo.name, schema: ExemploSchema }]),
  ],
  controllers: [ExemploController],
  providers: [ExemploService],
})
export class ExemploModule {}
