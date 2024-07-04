import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateReclamoDto } from './dto/create-reclamo.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Reclamo } from './entities/reclamo.entity';
import { CreateMovimientoReclamoDto } from './dto/create-movimiento-reclamo.dto';
import { Personal } from 'src/personal/entities/personal.entity';
import { MovimientoReclamo } from './entities/movimiento-reclamo.entity';
import { Desperfecto } from './entities/desperfecto.entity';

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

  async create({ documento, desperfecto, ...dto }: CreateReclamoDto) {
    const d = desperfecto
      ? {
          id: (await this.manager.insert(Desperfecto, desperfecto))
            .identifiers[0].id,
        }
      : { id: dto.desperfectoId };

    const x = Number.isNaN(Number(documento))
      ? { documento: documento as string }
      : { personalId: documento as number };

    return this.manager.save(Reclamo, {
      ...dto,
      ...x,
      desperfectoId: d.id,
    });
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
