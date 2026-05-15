import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pratica, PraticaDocument } from './pratica.model';

export interface CriarPraticaDto {
  nomeUsuario: string;
  tipo: string;
  data: string;
  descricao?: string;
}

export interface FiltroHistoricoDto {
  nomeUsuario?: string;
  tipo?: string;
  dataInicial?: string;
  dataFinal?: string;
}

@Injectable()
export class PraticaService {
  constructor(
    @InjectModel(Pratica.name) private praticaModel: Model<PraticaDocument>,
  ) {}

  async criar(dto: CriarPraticaDto): Promise<Pratica> {
    if (!dto.nomeUsuario || !dto.tipo || !dto.data) {
      throw new BadRequestException(
        'Campos obrigatórios: nomeUsuario, tipo, data',
      );
    }
    const nova = new this.praticaModel(dto);
    return nova.save();
  }

  async historico(filtros: FiltroHistoricoDto): Promise<Pratica[]> {
    const query: any = {};

    if (filtros.nomeUsuario) {
      query.nomeUsuario = { $regex: filtros.nomeUsuario, $options: 'i' };
    }

    if (filtros.tipo) {
      query.tipo = { $regex: filtros.tipo, $options: 'i' };
    }

    if (filtros.dataInicial || filtros.dataFinal) {
      query.data = {};
      if (filtros.dataInicial) query.data.$gte = filtros.dataInicial;
      if (filtros.dataFinal) query.data.$lte = filtros.dataFinal;
    }

    return this.praticaModel.find(query).sort({ data: -1 }).exec();
  }

  async estatisticas(): Promise<any> {
    const totalGeral = await this.praticaModel.countDocuments();

    const porTipo = await this.praticaModel.aggregate([
      { $group: { _id: '$tipo', total: { $sum: 1 } } },
      { $sort: { total: -1 } },
    ]);

    const tipoMaisRegistrado = porTipo.length > 0 ? porTipo[0]._id : null;

    const porUsuario = await this.praticaModel.aggregate([
      { $group: { _id: '$nomeUsuario', total: { $sum: 1 } } },
      { $sort: { total: -1 } },
    ]);

    const usuarioMaisAtivo = porUsuario.length > 0 ? porUsuario[0]._id : null;

    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);
    const dataLimite = trintaDiasAtras.toISOString().split('T')[0];

    const totalUltimos30Dias = await this.praticaModel.countDocuments({
      data: { $gte: dataLimite },
    });

    const mediaDiaria = parseFloat((totalUltimos30Dias / 30).toFixed(2));

    return {
      totalGeral,
      tipoMaisRegistrado,
      usuarioMaisAtivo,
      totalPorTipo: porTipo.map((p) => ({ tipo: p._id, total: p.total })),
      mediaDiariaUltimos30Dias: mediaDiaria,
    };
  }
}
