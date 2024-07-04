import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Categoria } from './categoria.entity';
import { Rubro } from './rubro.entity';
import { Vecino } from 'src/vecino/entities/vecino.entity';
import { Sitio } from './sitio.entity';
import { Oferta } from './oferta.entity';

@Entity('comercio')
export class Comercio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  telefono?: string;

  @Column({ type: 'text', array: true, nullable: true })
  imagenes?: string[];

  @Column({ type: 'timestamp', nullable: true })
  fechaIngreso?: Date;

  @Column({ type: 'boolean', default: false })
  verificado: boolean;

  @Column()
  @RelationId((x: Comercio) => x.categoria)
  categoriaId?: number;
  @ManyToOne(() => Categoria, (x) => x.comercios)
  categoria?: Categoria;

  @Column({ nullable: true })
  @RelationId((x: Comercio) => x.rubro)
  rubroId: number;
  @ManyToOne(() => Rubro, (x) => x.comercios, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  rubro?: Rubro;

  @Column()
  @RelationId((x: Comercio) => x.categoria)
  sitioId: number;
  @ManyToOne(() => Sitio, (x) => x.comercios, { onDelete: 'CASCADE' })
  sitio: Sitio;

  @Column()
  @RelationId((x: Comercio) => x.vecino)
  documento: string;
  @JoinColumn({ name: 'documento' })
  @ManyToOne(() => Vecino, (x) => x.comercios, { onDelete: 'CASCADE' })
  vecino: Vecino;

  @OneToMany(() => Oferta, (x) => x.comercio)
  ofertas: Oferta[];
}
