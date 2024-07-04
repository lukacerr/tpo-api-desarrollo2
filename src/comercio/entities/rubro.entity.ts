import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Comercio } from './comercio.entity';
import { Desperfecto } from 'src/reclamo/entities/desperfecto.entity';
import { Personal } from 'src/personal/entities/personal.entity';

@Entity('rubro')
export class Rubro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @OneToMany(() => Comercio, (x) => x.rubro)
  comercios?: Comercio[];

  @OneToMany(() => Desperfecto, (x) => x.rubro)
  desperfectos?: Desperfecto[];

  @OneToMany(() => Personal, (x) => x.rubro)
  inspectores?: Personal[];
}
