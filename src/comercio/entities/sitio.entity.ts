import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Comercio } from './comercio.entity';
import { Reclamo } from 'src/reclamo/entities/reclamo.entity';

@Entity('sitio')
export class Sitio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric', nullable: true })
  latitud?: number;

  @Column({ type: 'numeric', nullable: true })
  longitud?: number;

  @Column({ type: 'varchar', nullable: true })
  calle?: string;

  @Column({ type: 'integer', nullable: true })
  numero?: number;

  @Column({ type: 'varchar', nullable: true })
  entreCalleA?: string;

  @Column({ type: 'varchar', nullable: true })
  entreCalleB?: string;

  @Column()
  descripcion: string;

  @Column()
  aCargoDe: string;

  @Column({ type: 'time' })
  apertura: string;

  @Column({ type: 'time' })
  cierre: string;

  @Column({ type: 'text', nullable: true })
  comentarios?: string;

  @OneToMany(() => Comercio, (x) => x.sitio)
  comercios: Comercio[];

  @OneToMany(() => Reclamo, (x) => x.sitio)
  reclamos: Reclamo[];
}
