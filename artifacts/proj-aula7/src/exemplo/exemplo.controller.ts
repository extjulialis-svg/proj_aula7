import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ExemploService } from './exemplo.service';
import { Exemplo } from './exemplo.model';

@Controller('exemplo')
export class ExemploController {
  constructor(private readonly exemploService: ExemploService) {}

  @Get()
  findAll() {
    return this.exemploService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exemploService.findOne(id);
  }

  @Post()
  create(@Body() body: Partial<Exemplo>) {
    return this.exemploService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<Exemplo>) {
    return this.exemploService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exemploService.remove(id);
  }
}
