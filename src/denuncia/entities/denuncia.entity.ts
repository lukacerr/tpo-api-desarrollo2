import { Sitio } from 'src/comercio/entities/sitio.entity';
import { Vecino } from 'src/vecino/entities/vecino.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { MovimientoDenuncia } from './movimiento-denuncia.entity';

@Entity('denuncia')
export class Denuncia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @RelationId((x: Denuncia) => x.sitio)
  sitioId?: number;
  @ManyToOne(() => Sitio, { nullable: true, onDelete: 'SET NULL' })
  sitio?: Sitio;

  @Column({ nullable: true })
  descripcion?: string;

  @Column({ nullable: true })
  estado?: string;

  @Column({ type: 'boolean', default: true })
  aceptaResponsabilidad: boolean;

  @Column()
  @RelationId((x: Denuncia) => x.vecino)
  documento: string;
  @JoinColumn({ name: 'documento' })
  @ManyToOne(() => Vecino, (x) => x.denuncias, { onDelete: 'CASCADE' })
  vecino?: Vecino;

  @OneToMany(() => MovimientoDenuncia, (x) => x.denuncia)
  movimientos: MovimientoDenuncia[];
}
