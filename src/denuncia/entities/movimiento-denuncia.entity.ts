import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { Denuncia } from './denuncia.entity';

@Entity('movimientoDenuncia')
export class MovimientoDenuncia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  responsable: string;

  @Column()
  causa: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column()
  @RelationId((x: MovimientoDenuncia) => x.denuncia)
  denunciaId: number;
  @ManyToOne(() => Denuncia, (x) => x.movimientos, { onDelete: 'CASCADE' })
  denuncia?: Denuncia;
}
