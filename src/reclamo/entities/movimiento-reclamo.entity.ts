import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { Reclamo } from './reclamo.entity';

@Entity('movimientoReclamo')
export class MovimientoReclamo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  responsable: string;

  @Column()
  causa: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column()
  @RelationId((x: MovimientoReclamo) => x.reclamo)
  reclamoId: number;
  @ManyToOne(() => Reclamo, (x) => x.movimientos, { onDelete: 'CASCADE' })
  reclamo?: Reclamo;
}
