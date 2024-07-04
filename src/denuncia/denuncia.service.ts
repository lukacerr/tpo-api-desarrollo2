import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateDenunciaDto } from './dto/create-denuncia.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Denuncia } from './entities/denuncia.entity';
import { CreateMovimientoDenunciaDto } from './dto/create-movimiento-denuncia.dto';
import { Personal } from 'src/personal/entities/personal.entity';
import { MovimientoDenuncia } from './entities/movimiento-denuncia.entity';

@Injectable()
export class DenunciaService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  create(dto: CreateDenunciaDto) {
    return this.manager.save(Denuncia, dto);
  }

  async postMovimiento(
    id: number,
    legajo: number,
    dto: CreateMovimientoDenunciaDto,
  ) {
    const admin = await this.manager.findOneBy(Personal, { id: legajo });
    if (!admin) throw new UnauthorizedException();

    if (dto.estado)
      await this.manager.update(Denuncia, { id }, { estado: dto.estado });

    return this.manager.insert(MovimientoDenuncia, {
      responsable: `${admin.documento} (${admin.apellido}, ${admin.nombre})`,
      causa: dto.causa,
      denunciaId: id,
    });
  }
}
