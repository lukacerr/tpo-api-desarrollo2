import { Injectable } from '@nestjs/common';
import { CreateComercioDto } from './dto/create-comercio.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Rubro } from './entities/rubro.entity';
import { Comercio } from './entities/comercio.entity';
import { Oferta } from './entities/oferta.entity';
import { CreateOfertaDto } from './dto/create-oferta.dto';

@Injectable()
export class ComercioService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  getRubros() {
    return this.manager.find(Rubro);
  }

  getComercio() {
    return this.manager.find(Comercio, {
      relations: {
        rubro: { desperfectos: true },
        sitio: true,
        vecino: { barrio: true },
        ofertas: true,
      },
    });
  }

  async postComercio(dto: CreateComercioDto) {
    return this.manager.save(Comercio, dto);
  }

  async remove(id: number) {
    return this.manager.delete(Comercio, { id });
  }

  async postOferta(comercioId: number, dto: CreateOfertaDto) {
    return this.manager.save(Oferta, { ...dto, comercioId });
  }

  async removeOferta(id: number) {
    return this.manager.delete(Oferta, { id });
  }
}
