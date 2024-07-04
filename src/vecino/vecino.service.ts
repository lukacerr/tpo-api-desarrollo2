import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateVecinoDto } from './dto/create-vecino.dto';
import { UpdateVecinoDto } from './dto/update-vecino.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Vecino } from './entities/vecino.entity';
import { Barrio } from './entities/barrio.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class VecinoService {
  constructor(
    @InjectEntityManager() private manager: EntityManager,
    private jwtService: JwtService,
  ) {}

  getBarrios() {
    return this.manager.find(Barrio);
  }

  async signIn(documento: string, pass: string) {
    const x = await this.manager.findOneBy(Vecino, { documento });
    if (x?.password !== pass || !x.verificado) return 'No está verificado';
    return this.jwtService.signAsync({ sub: x.documento });
  }

  async getMe(documento: string) {
    return this.manager.findOne(Vecino, {
      where: { documento },
      relations: {
        barrio: true,
        comercios: {
          rubro: { desperfectos: { reclamos: true } },
          sitio: true,
          ofertas: true,
        },
        denuncias: {
          sitio: true,
          movimientos: true,
        },
        reclamos: {
          sitio: true,
          desperfecto: { reclamos: true },
          reclamoUnificado: {
            sitio: true,
            desperfecto: { reclamos: true },
            movimientos: true,
          },
          reclamosUnificados: {
            sitio: true,
            desperfecto: { reclamos: true },
            movimientos: true,
          },
          movimientos: true,
        },
      },
    });
  }

  async update(documento: string, password: string) {
    return this.manager.update(Vecino, { documento }, { password });
  }
}
