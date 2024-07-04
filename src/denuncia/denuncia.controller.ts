import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Param,
} from '@nestjs/common';
import { DenunciaService } from './denuncia.service';
import { CreateDenunciaDto } from './dto/create-denuncia.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateMovimientoDenunciaDto } from './dto/create-movimiento-denuncia.dto';

@Controller('denuncia')
export class DenunciaController {
  constructor(private readonly denunciaService: DenunciaService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() { user: { sub } }: any, @Body() dto: CreateDenunciaDto) {
    return this.denunciaService.create({ ...dto, documento: sub });
  }

  @UseGuards(AuthGuard)
  @Post(':id')
  postMovimiento(
    @Request() { user: { sub } }: any,
    @Param('id') id: string,
    @Body() dto: CreateMovimientoDenunciaDto,
  ) {
    return this.denunciaService.postMovimiento(+id, sub, dto);
  }
}
