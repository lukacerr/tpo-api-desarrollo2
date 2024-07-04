import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ReclamoService } from './reclamo.service';
import { CreateReclamoDto } from './dto/create-reclamo.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateMovimientoDenunciaDto } from 'src/denuncia/dto/create-movimiento-denuncia.dto';

@Controller('reclamo')
export class ReclamoController {
  constructor(private readonly reclamoService: ReclamoService) {}

  @Get()
  getReclamos() {
    return this.reclamoService.getReclamos();
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() { user: { sub } }: any, @Body() dto: CreateReclamoDto) {
    return this.reclamoService.create({ ...dto, documento: sub });
  }

  @UseGuards(AuthGuard)
  @Post(':id')
  postMovimiento(
    @Request() { user: { sub } }: any,
    @Param('id') id: string,
    @Body() dto: CreateMovimientoDenunciaDto,
  ) {
    return this.reclamoService.postMovimiento(+id, sub, dto);
  }
}
