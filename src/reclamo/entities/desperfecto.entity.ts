import { Rubro } from 'src/comercio/entities/rubro.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
  OneToMany,
} from 'typeorm';
import { Reclamo } from './reclamo.entity';

@Entity('desperfecto')
export class Desperfecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column()
  @RelationId((x: Desperfecto) => x.rubro)
  rubroId: number;
  @ManyToOne(() => Rubro, (x) => x.desperfectos, { onDelete: 'SET NULL' })
  rubro: Rubro;

  @OneToMany(() => Reclamo, (x) => x.desperfecto)
  reclamos: Reclamo[];
}
