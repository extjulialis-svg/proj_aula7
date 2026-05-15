import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PraticaDocument = Pratica & Document;

@Schema({ timestamps: true })
export class Pratica {
  @Prop({ required: true })
  nomeUsuario: string;

  @Prop({ required: true })
  tipo: string;

  @Prop({ required: true })
  data: string;

  @Prop()
  descricao: string;
}

export const PraticaSchema = SchemaFactory.createForClass(Pratica);
