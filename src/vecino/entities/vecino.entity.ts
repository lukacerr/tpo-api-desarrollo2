import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  RelationId,
  OneToMany,
} from 'typeorm';
import { Barrio } from './barrio.entity';
import { Comercio } from 'src/comercio/entities/comercio.entity';
import { Denuncia } from 'src/denuncia/entities/denuncia.entity';
import { Reclamo } from 'src/reclamo/entities/reclamo.entity';

@Entity('vecino')
export class Vecino {
  @PrimaryColumn()
  documento: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  direccion: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  @RelationId((x: Vecino) => x.barrio)
  barrioId?: number;
  @ManyToOne(() => Barrio, { nullable: true, onDelete: 'SET NULL' })
  barrio?: Barrio;

  @OneToMany(() => Comercio, (x) => x.vecino)
  comercios?: Comercio[];

  @OneToMany(() => Denuncia, (x) => x.vecino)
  denuncias?: Denuncia[];

  @OneToMany(() => Reclamo, (x) => x.vecino)
  reclamos?: Reclamo[];

  @Column({ default: false })
  verificado: boolean;
}
