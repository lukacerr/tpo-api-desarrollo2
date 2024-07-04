import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ComercioService } from './comercio.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateComercioDto } from './dto/create-comercio.dto';
import { CreateOfertaDto } from './dto/create-oferta.dto';

@Controller('comercio')
export class ComercioController {
  constructor(private readonly comercioService: ComercioService) {}

  @Get('rubros')
  getRubros() {
    return this.comercioService.getRubros();
  }

  @Get()
  getComercio() {
    return this.comercioService.getComercio();
  }

  @UseGuards(AuthGuard)
  @Post()
  postComercio(
    @Request() { user: { sub } }: any,
    @Body() dto: CreateComercioDto,
  ) {
    return this.comercioService.postComercio({ ...dto, documento: sub });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comercioService.remove(+id);
  }

  @Post(':id')
  postOferta(@Param('id') id: string, @Body() dto: CreateOfertaDto) {
    return this.comercioService.postOferta(+id, dto);
  }

  @Delete('oferta/:id')
  removeOferta(@Param('id') id: string) {
    return this.comercioService.removeOferta(+id);
  }
}
