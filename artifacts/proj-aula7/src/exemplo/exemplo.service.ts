import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exemplo, ExemploDocument } from './exemplo.model';

@Injectable()
export class ExemploService {
  constructor(
    @InjectModel(Exemplo.name) private exemploModel: Model<ExemploDocument>,
  ) {}

  async findAll(): Promise<Exemplo[]> {
    return this.exemploModel.find().exec();
  }

  async findOne(id: string): Promise<Exemplo> {
    const exemplo = await this.exemploModel.findById(id).exec();
    if (!exemplo) {
      throw new NotFoundException(`Exemplo com id ${id} não encontrado`);
    }
    return exemplo;
  }

  async create(data: Partial<Exemplo>): Promise<Exemplo> {
    const novo = new this.exemploModel(data);
    return novo.save();
  }

  async update(id: string, data: Partial<Exemplo>): Promise<Exemplo> {
    const atualizado = await this.exemploModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!atualizado) {
      throw new NotFoundException(`Exemplo com id ${id} não encontrado`);
    }
    return atualizado;
  }

  async remove(id: string): Promise<{ message: string }> {
    const resultado = await this.exemploModel.findByIdAndDelete(id).exec();
    if (!resultado) {
      throw new NotFoundException(`Exemplo com id ${id} não encontrado`);
    }
    return { message: `Exemplo ${id} removido com sucesso` };
  }
}
