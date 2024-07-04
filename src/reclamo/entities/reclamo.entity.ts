import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Desperfecto } from './desperfecto.entity';
import { Sitio } from 'src/comercio/entities/sitio.entity';
import { Vecino } from 'src/vecino/entities/vecino.entity';
import { MovimientoReclamo } from './movimiento-reclamo.entity';

@Entity('reclamo')
export class Reclamo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @RelationId((x: Reclamo) => x.vecino)
  documento: string;
  @JoinColumn({ name: 'documento' })
  @ManyToOne(() => Vecino, (x) => x.reclamos, { onDelete: 'CASCADE' })
  vecino?: Vecino;

  @Column()
  @RelationId((x: Reclamo) => x.sitio)
  sitioId: number;
  @ManyToOne(() => Sitio, (x) => x.reclamos, { onDelete: 'CASCADE' })
  sitio?: Sitio;

  @Column()
  @RelationId((x: Reclamo) => x.desperfecto)
  desperfectoId: number;
  @ManyToOne(() => Desperfecto, (x) => x.reclamos, { onDelete: 'CASCADE' })
  desperfecto?: Desperfecto;

  @Column({ nullable: true })
  descripcion?: string;

  @Column({ nullable: true })
  estado?: string;

  @Column({ nullable: true })
  @RelationId((x: Reclamo) => x.reclamoUnificado)
  reclamoUnificadoId?: number;
  @ManyToOne(() => Reclamo, (x) => x.reclamosUnificados, {
    onDelete: 'SET NULL',
  })
  reclamoUnificado?: Reclamo;

  @OneToMany(() => Reclamo, (reclamo) => reclamo.reclamoUnificado)
  reclamosUnificados: Reclamo[];

  @OneToMany(() => MovimientoReclamo, (x) => x.reclamo)
  movimientos: MovimientoReclamo[];
}
