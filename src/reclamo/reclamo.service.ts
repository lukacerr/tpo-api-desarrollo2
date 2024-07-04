import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateReclamoDto } from './dto/create-reclamo.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Reclamo } from './entities/reclamo.entity';
import { CreateMovimientoReclamoDto } from './dto/create-movimiento-reclamo.dto';
import { Personal } from 'src/personal/entities/personal.entity';
import { Denuncia } from 'src/denuncia/entities/denuncia.entity';
import { MovimientoDenuncia } from 'src/denuncia/entities/movimiento-denuncia.entity';
import { MovimientoReclamo } from './entities/movimiento-reclamo.entity';

@Injectable()
export class ReclamoService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  getReclamos() {
    return this.manager.find(Reclamo, {
      relations: {
        vecino: { barrio: true },
        sitio: { comercios: true },
        desperfecto: { rubro: true },
        reclamosUnificados: true,
        reclamoUnificado: true,
        movimientos: true,
      },
    });
  }

  create(dto: CreateReclamoDto) {
    return this.manager.save(Reclamo, dto);
  }

  async postMovimiento(
    id: number,
    legajo: number,
    dto: CreateMovimientoReclamoDto,
  ) {
    const admin = await this.manager.findOneBy(Personal, { id: legajo });
    if (!admin) throw new UnauthorizedException();

    if (dto.estado)
      await this.manager.update(Reclamo, { id }, { estado: dto.estado });

    return this.manager.insert(MovimientoReclamo, {
      responsable: `${admin.documento} (${admin.apellido}, ${admin.nombre})`,
      causa: dto.causa,
      reclamoId: id,
    });
  }
}
