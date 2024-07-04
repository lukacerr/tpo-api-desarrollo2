import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Comercio } from './comercio.entity';

@Entity('categoria')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  imagen?: string;

  @OneToMany(() => Comercio, (x) => x.categoria)
  comercios: Comercio[];
}
