import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Personal } from './entities/personal.entity';

@Injectable()
export class PersonalService {
  constructor(
    @InjectEntityManager() private manager: EntityManager,
    private jwtService: JwtService,
  ) {}

  async signIn(id: number, pass: string) {
    const x = await this.manager.findOneBy(Personal, { id });
    if (x?.password !== pass) throw new UnauthorizedException();
    return this.jwtService.signAsync({ sub: x.id });
  }

  async getMe(id: number) {
    return this.manager.findOne(Personal, {
      where: { id },
      relations: {
        rubro: {
          comercios: {
            sitio: true,
            vecino: { barrio: true },
            ofertas: true,
          },
          desperfectos: {
            reclamos: {
              vecino: { barrio: true },
              sitio: { comercios: true },
              reclamosUnificados: true,
              reclamoUnificado: true,
              movimientos: true,
            },
          },
        },
      },
    });
  }
}
