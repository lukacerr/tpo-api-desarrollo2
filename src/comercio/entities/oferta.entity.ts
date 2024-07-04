import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { Comercio } from './comercio.entity';

@Entity('oferta')
export class Oferta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ nullable: true })
  descripcion?: string;

  @Column({ default: false })
  verificado: boolean;

  @Column()
  @RelationId((x: Oferta) => x.comercio)
  comercioId: number;
  @ManyToOne(() => Comercio, (x) => x.ofertas, { onDelete: 'CASCADE' })
  comercio: Comercio;
}
