import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExemploDocument = Exemplo & Document;

@Schema({ timestamps: true })
export class Exemplo {
  @Prop({ required: true })
  nome: string;

  @Prop()
  descricao: string;

  @Prop({ default: true })
  ativo: boolean;
}

export const ExemploSchema = SchemaFactory.createForClass(Exemplo);
