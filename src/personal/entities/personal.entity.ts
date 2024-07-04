import { Rubro } from 'src/comercio/entities/rubro.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  RelationId,
  ManyToOne,
} from 'typeorm';

@Entity('personal')
@Unique(['documento'])
export class Personal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ type: 'varchar', unique: true })
  documento: string;

  @Column()
  password: string;

  @Column()
  @RelationId((x: Personal) => x.rubro)
  rubroId: number;
  @ManyToOne(() => Rubro, (x) => x.inspectores, { onDelete: 'CASCADE' })
  rubro: Rubro;

  @Column({ type: 'integer', nullable: true })
  categoria?: number;

  @Column({ type: 'date', nullable: true })
  fechaIngreso?: Date;
}
