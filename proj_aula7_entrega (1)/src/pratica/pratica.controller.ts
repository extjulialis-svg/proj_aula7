import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PraticaService, CriarPraticaDto, FiltroHistoricoDto } from './pratica.service';

@Controller()
export class PraticaController {
  constructor(private readonly praticaService: PraticaService) {}

  @Post('pratica')
  criar(@Body() body: CriarPraticaDto) {
    return this.praticaService.criar(body);
  }

  @Get('historico')
  historico(@Query() query: FiltroHistoricoDto) {
    return this.praticaService.historico(query);
  }

  @Get('estatisticas')
  estatisticas() {
    return this.praticaService.estatisticas();
  }
}
